const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/amudevelopers').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('settings').updateOne({}, {
    $set: {
      services: [
        { id: 1, icon: 'fa-code', title: 'Custom Software', desc: 'Tailored enterprise software solutions built to match your exact business requirements.' },
        { id: 2, icon: 'fa-globe', title: 'Web Development', desc: 'Scalable, high-performance web applications and cloud portals.' },
        { id: 3, icon: 'fa-mobile-screen', title: 'Mobile Apps', desc: 'Native and cross-platform mobile apps for iOS and Android.' },
        { id: 4, icon: 'fa-pen-nib', title: 'UI/UX Design', desc: 'Intuitive, user-centered designs that drive engagement and conversions.' },
        { id: 5, icon: 'fa-robot', title: 'AI & Automation', desc: 'Integrate artificial intelligence to automate processes and gain insights.' },
        { id: 6, icon: 'fa-cloud', title: 'Cloud Solutions', desc: 'Secure cloud architecture, migration, and DevOps services.' },
        { id: 7, icon: 'fa-cart-shopping', title: 'E-commerce', desc: 'Robust digital storefronts with seamless payment integrations.' },
        { id: 8, icon: 'fa-headset', title: 'Maintenance', desc: 'Continuous monitoring, software updates, and dedicated tech support.' }
      ]
    }
  });
  console.log('Fixed services');
  process.exit(0);
});
