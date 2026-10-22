STYLEBOX: ADMIN DASHBOARD + SUPABASE DATABASE
============================================

FILES
-----
index.html / style.css / script.js : customer storefront
admin.html / admin.css / admin.js   : private admin interface
config.js                           : Supabase project URL + publishable/anon key
supabase_setup.sql                  : database tables, security policies and image storage

IMPORTANT
---------
The website cannot connect to a real database until you create a Supabase project and add its URL/key to config.js. Do not put a service_role/secret key in browser JavaScript. The public/anon key is intended for the browser when Row Level Security is configured correctly.

SETUP (ONE TIME)
----------------
1. Create a project at https://supabase.com/ and keep your database password private.
2. In the Supabase project, open SQL Editor > New query.
3. Open supabase_setup.sql in VS Code, copy all its SQL, paste into SQL Editor and run it.
4. In Supabase Project Settings > API, copy the Project URL and publishable key (or legacy anon key).
5. Open config.js and replace YOUR_SUPABASE_PROJECT_URL and YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY with those values. Keep the quotes.
6. In Supabase Authentication > Users, create your admin user with your own email and a strong password. If email confirmation is enabled, confirm the email first.
7. Copy that user's UUID from Authentication > Users.
8. In Supabase SQL Editor, run this statement after replacing the example UUID with the real one:
   insert into public.admins (user_id) values ('PASTE-AUTH-USER-UUID-HERE');
   Never guess the UUID. This allowlist is what gives the account admin permission.
9. Run the site with VS Code Live Server. Open admin.html, sign in, and add a test product.
10. Open index.html and refresh. Published products should load from the database.

HOW TO ADD PRODUCTS
-------------------
- Use admin.html > Add product.
- Enter name, category, price, stock quantity, sizes, and colours. Colour format example: Black:#171717, White:#ffffff.
- Select several real photos of the same garment to upload them to the product-images bucket, or paste image URLs one per line. The first image is used as the card cover.
- For this simple admin form, each colour uses the same gallery. If you need different actual photos for each colour, upload a set for that colour and then extend the colours JSON in Supabase; do not pretend the same photos accurately represent different colourways.
- Tick Publish to make it visible to customers. Unpublished items stay in the admin inventory.
- Edit stock when new stock arrives. A stock quantity of zero is displayed as out of stock in the admin dashboard; WhatsApp orders still need manual availability confirmation.

SECURITY AND LIMITATIONS
------------------------
- Do not share your admin password or secret/service_role key.
- The SQL enables Row Level Security. Public visitors can only read published products; only user IDs in public.admins can create/update/delete products and upload images.
- This is an inventory/product catalogue, not yet an order-management system. WhatsApp checkout is manual and does not verify payments or reserve stock.
- Supabase products load when the storefront opens. This package reloads the product list on page load; it does not use realtime push subscriptions.
- The existing sample catalogue is used only when Supabase configuration is left as a placeholder. After adding config, an empty database will show no sample products, so add your real products from admin.html.
- For production, publish the site over HTTPS (for example GitHub Pages) and set appropriate Supabase Auth URL/redirect settings to your deployed domain.
