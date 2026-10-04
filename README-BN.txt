HJ SHOP — FULL ADMIN VERSION

এই প্যাকেজে আছে:
- index.html = customer website
- admin.html = full admin panel
- app.js / admin.js / CSS
- supabase-config.js = Supabase connection
- supabase-schema.sql = database + security rules

গুরুত্বপূর্ণ:
GitHub Pages একা দিয়ে নিরাপদ online admin/database করা যায় না। তাই এই version Supabase-ready।

SETUP:
1. Supabase-এ একটি project তৈরি করুন।
2. SQL Editor-এ supabase-schema.sql পুরোটা Run করুন।
3. Authentication > Users থেকে একটি admin email/password user তৈরি করুন।
4. ওই user-এর UUID নিয়ে SQL-এর শেষের INSERT চালান:
   insert into public.admins(user_id) values ('YOUR-UUID');
5. Project Settings > API থেকে Project URL এবং anon/publishable key নিন।
6. supabase-config.js-এ বসান:
   window.HJ_SUPABASE_URL = '...';
   window.HJ_SUPABASE_ANON_KEY = '...';
7. সব ফাইল GitHub repository-তে upload/replace করুন।
8. আপনার Admin Panel হবে:
   https://habibbx25-bit.github.io/hjshop/admin.html

Admin Panel থেকে:
- Product add/edit/delete
- Price/discount/stock/category/image URL
- Home hero text/image/button
- Promo banner text/image/button
- Logo/site name/topbar
- WhatsApp/Facebook
- About/Contact text
- Dhaka/outside-Dhaka delivery charge
- Orders দেখা ও status change

নিরাপত্তা:
- Supabase anon/publishable key frontend-এ রাখা স্বাভাবিক; RLS policy নিরাপত্তা দেয়।
- Service-role key কখনো website code-এ দেবেন না।
