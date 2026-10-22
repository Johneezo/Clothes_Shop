const $ = (id) => document.getElementById(id);
let db = null;
let allProducts = [];
let activeUser = null;
const config = window.STYLEBOX_CONFIG || {};
const configured = Boolean(window.supabase?.createClient && config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.includes('YOUR_') && !config.supabaseAnonKey.includes('YOUR_'));

function message(el, text, bad=false){ el.textContent=text; el.style.color=bad?'#ff9b8f':'#d5ff38'; }
function showGlobal(text){const el=$('globalMessage');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3000);}
function money(v){return `K${Number(v||0).toLocaleString('en-ZM',{maximumFractionDigits:2})}`;}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function parseColours(text, images){
  const entries=text.split(',').map(x=>x.trim()).filter(Boolean);
  if(!entries.length) throw new Error('Enter at least one colour.');
  return entries.map(entry=>{
    const parts=entry.split(':'); const name=parts[0].trim(); const hex=(parts[1]||'#777777').trim();
    if(!name) throw new Error('Every colour needs a name.');
    if(!/^#[0-9a-fA-F]{6}$/.test(hex)) throw new Error(`Use a six-digit hex colour for ${name}, e.g. Black:#171717.`);
    return {name,hex,images};
  });
}
function parseSizes(text){return [...new Set(text.split(',').map(x=>x.trim()).filter(Boolean))];}
function clearForm(){ $('productForm').reset();$('productId').value='';$('productStock').value='0';$('productTag').value='NEW ARRIVAL';$('productPublished').checked=true;$('formTitle').textContent='Add a product';$('formEyebrow').textContent='NEW ARRIVAL';$('saveProductBtn').textContent='Save product';$('productImageUrls').value='';$('productImages').value='';message($('formMessage'),''); }
function fillForm(p){$('productId').value=p.id;$('productName').value=p.name;$('productCategory').value=p.category;$('productPrice').value=p.price;$('productStock').value=p.stock_quantity;$('productTag').value=p.tag||'';$('productDescription').value=p.description||'';$('productSizes').value=(p.sizes||[]).join(', ');$('productColours').value=(p.colours||[]).map(c=>`${c.name}:${c.hex||'#777777'}`).join(', ');$('productImageUrls').value=(p.image_urls||[]).join('\n');$('productPublished').checked=!!p.published;$('productImages').value='';$('formTitle').textContent='Edit product';$('formEyebrow').textContent='UPDATE STOCK';$('saveProductBtn').textContent='Update product';message($('formMessage'),'Editing selected product. Save to apply changes.');$('productForm').scrollIntoView({behavior:'smooth',block:'start'});}
async function uploadSelectedFiles(existingUrls){
  const files=[...($('productImages').files||[])]; if(!files.length)return existingUrls;
  const uploaded=[];
  for(const file of files){
    if(!file.type.startsWith('image/'))throw new Error(`${file.name} is not an image file.`);
    if(file.size>8*1024*1024)throw new Error(`${file.name} is over 8 MB. Choose a smaller image.`);
    const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg';
    const path=`${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const {error}=await db.storage.from('product-images').upload(path,file,{upsert:false,contentType:file.type});
    if(error)throw error;
    const {data}=db.storage.from('product-images').getPublicUrl(path);uploaded.push(data.publicUrl);
  }
  return [...uploaded,...existingUrls];
}
async function loadInventory(){
  const {data,error}=await db.from('products').select('*').order('created_at',{ascending:false});
  if(error){$('inventoryList').innerHTML=`<p class="muted">Could not load inventory: ${safe(error.message)}</p>`;return;}
  allProducts=data||[];renderInventory();
}
function renderInventory(){
  const query=$('inventorySearch').value.trim().toLowerCase();const filtered=allProducts.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(query));
  $('inventoryCount').textContent=String(allProducts.length);$('publishedCount').textContent=String(allProducts.filter(p=>p.published).length);$('stockCount').textContent=String(allProducts.reduce((n,p)=>n+Number(p.stock_quantity||0),0));$('outOfStockCount').textContent=String(allProducts.filter(p=>Number(p.stock_quantity||0)===0).length);
  if(!filtered.length){$('inventoryList').innerHTML='<p class="muted">No products yet. Use “Add product” to add your first item.</p>';return;}
  $('inventoryList').innerHTML=filtered.map(p=>`<article class="product-row"><img src="${safe((p.image_urls||[])[0]||'https://placehold.co/200x240/171717/d5ff38?text=StyleBox')}" alt=""><div><h3>${safe(p.name)}</h3><p>${safe(p.category)} · ${money(p.price)}</p><p>Stock: ${Number(p.stock_quantity||0)} · ${(p.sizes||[]).length} size options</p><span class="pill ${p.published?'':'off'}">${p.published?'PUBLISHED':'HIDDEN'}${Number(p.stock_quantity||0)===0?' · OUT OF STOCK':''}</span></div><div class="row-actions"><button class="mini-button" data-action="edit" data-id="${p.id}">Edit</button><button class="mini-button" data-action="toggle" data-id="${p.id}">${p.published?'Hide':'Publish'}</button><button class="mini-button delete" data-action="delete" data-id="${p.id}">Delete</button></div></article>`).join('');
}
async function checkAdmin(user){const {data,error}=await db.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();if(error)throw error;if(!data)throw new Error('This account is not authorised as a StyleBox admin. Add its user UUID to public.admins in Supabase, then sign in again.');}
async function showDashboard(user){activeUser=user;await checkAdmin(user);$('loginPanel').hidden=true;$('dashboardPanel').hidden=false;$('signOutBtn').hidden=false;await loadInventory();}
async function boot(){if(!configured){$('setupWarning').hidden=false;message($('loginMessage'),'Set your Supabase URL and publishable/anon key in config.js first.',true);$('loginForm').querySelector('button').disabled=true;return;}db=window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey);const {data}=await db.auth.getSession();if(data.session){try{await showDashboard(data.session.user);}catch(e){message($('loginMessage'),e.message,true);await db.auth.signOut();}}}
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();if(!db)return;const btn=$('loginForm').querySelector('button');btn.disabled=true;message($('loginMessage'),'Signing in…');try{const {data,error}=await db.auth.signInWithPassword({email:$('emailInput').value.trim(),password:$('passwordInput').value});if(error)throw error;await showDashboard(data.user);message($('loginMessage'),'');}catch(err){message($('loginMessage'),err.message,true);}finally{btn.disabled=false;}});
$('signOutBtn').addEventListener('click',async()=>{if(db)await db.auth.signOut();activeUser=null;$('dashboardPanel').hidden=true;$('loginPanel').hidden=false;$('signOutBtn').hidden=true;clearForm();});
$('productForm').addEventListener('submit',async e=>{e.preventDefault();if(!db||!activeUser)return;const btn=$('saveProductBtn');btn.disabled=true;message($('formMessage'),'Saving product and uploading any selected photos…');try{
  const id=$('productId').value;const name=$('productName').value.trim();const category=$('productCategory').value;const price=Number($('productPrice').value);const stock=Number($('productStock').value);const sizes=parseSizes($('productSizes').value);if(!sizes.length)throw new Error('Enter at least one size.');if(!Number.isFinite(price)||price<0)throw new Error('Enter a valid price.');if(!Number.isInteger(stock)||stock<0)throw new Error('Stock must be a whole number of zero or more.');
  const old=allProducts.find(p=>p.id===id);const pasted=$('productImageUrls').value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);let imageUrls=await uploadSelectedFiles(pasted.length?pasted:(old?.image_urls||[]));
  // If editing and the image URL box was left empty with no new uploads, keep old image URLs.
  if(!imageUrls.length&&old?.image_urls)imageUrls=old.image_urls;
  const colours=parseColours($('productColours').value,imageUrls);
  const row={name,category,price,stock_quantity:stock,tag:$('productTag').value.trim()||'NEW ARRIVAL',description:$('productDescription').value.trim(),sizes,colours,image_urls:imageUrls,published:$('productPublished').checked};
  let result;if(id)result=await db.from('products').update(row).eq('id',id).select().single();else result=await db.from('products').insert(row).select().single();if(result.error)throw result.error;
  clearForm();await loadInventory();message($('formMessage'),id?'Product updated.':'Product added.');showGlobal(id?'Product updated successfully.':'Product added to your shop.');
 }catch(err){message($('formMessage'),err.message||'Could not save product.',true);}finally{btn.disabled=false;}});
$('newProductBtn').addEventListener('click',()=>{clearForm();$('productName').focus();$('productForm').scrollIntoView({behavior:'smooth',block:'start'});});$('cancelEditBtn').addEventListener('click',clearForm);$('resetFormBtn').addEventListener('click',clearForm);$('inventorySearch').addEventListener('input',renderInventory);
$('inventoryList').addEventListener('click',async e=>{const b=e.target.closest('[data-action]');if(!b)return;const p=allProducts.find(x=>x.id===b.dataset.id);if(!p)return;try{if(b.dataset.action==='edit')return fillForm(p);if(b.dataset.action==='toggle'){const {error}=await db.from('products').update({published:!p.published}).eq('id',p.id);if(error)throw error;await loadInventory();showGlobal(p.published?'Product hidden from the shop.':'Product published to the shop.');}if(b.dataset.action==='delete'){if(!confirm(`Delete “${p.name}”? This cannot be undone.`))return;const {error}=await db.from('products').delete().eq('id',p.id);if(error)throw error;await loadInventory();showGlobal('Product deleted.');}}catch(err){showGlobal(err.message||'Action failed.');}});
boot();
