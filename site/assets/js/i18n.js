/* =========================================================
   NOOR FÈS — Système i18n FR / AR avec support RTL
   Usage HTML :
     <h1 data-i18n="hero.title">Texte par défaut FR</h1>
     <input data-i18n-attr="placeholder" data-i18n="form.name.ph">
   Persistance via localStorage.
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'noorfes_lang';

  var dict = {
    fr: {
      'announce.1': 'Livraison gratuite dès 600 DH',
      'announce.2': 'Paiement à la livraison partout au Maroc',
      'announce.3': 'Garantie cuir véritable',

      'nav.collection': 'Collection',
      'nav.story': 'Notre histoire',
      'nav.materials': 'Le cuir',
      'nav.reviews': 'Avis',
      'nav.contact': 'Contact',

      'lang.toggle': 'العربية',
      'lang.toggle.aria': 'Basculer la langue en arabe',

      'hero.eyebrow': 'Maroquinerie · Cuir véritable de Fès',
      'hero.title.html': 'Le cuir authentique,<br/><em>cousu main</em> dans la médina de Fès.',
      'hero.lead': 'Sacs à dos, sacs à main et sacs de voyage façonnés par les maîtres tanneurs et selliers du quartier Chouara — un savoir-faire transmis depuis le XIᵉ siècle.',
      'hero.cta.primary': 'Découvrir la collection',
      'hero.cta.ghost': 'Notre histoire',
      'hero.badge.1': '100%',
      'hero.badge.1.label': 'cuir véritable',
      'hero.badge.2': 'Fait main',
      'hero.badge.2.label': 'à Fès',
      'hero.badge.3': 'Livraison',
      'hero.badge.3.label': '24-72h',
      'hero.badge.4': 'Paiement',
      'hero.badge.4.label': 'à la livraison',

      'trust.1.title': 'Cuir véritable garanti',
      'trust.1.text': "Pleine fleur tannée à Fès. Si ce n'est pas du vrai cuir, vous êtes remboursé.",
      'trust.2.title': 'Paiement à la livraison',
      'trust.2.text': 'Vous payez en cash uniquement quand le livreur vous remet le colis. 0 risque.',
      'trust.3.title': 'Livraison 24-72h',
      'trust.3.text': 'Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir et toutes les villes du Royaume.',
      'trust.4.title': 'Satisfait ou remboursé',
      'trust.4.text': "14 jours pour changer d'avis. Échange ou remboursement, sans questions.",

      'col.eyebrow': 'La collection',
      'col.title.html': 'Des pièces intemporelles, <em>conçues pour durer</em>.',
      'col.lead': "Chaque sac NOOR FÈS est unique : la patine du cuir, les coutures faites à la main et la signature au fer chaud racontent l'âme de la médina.",
      'col.p1.name': 'Sac à dos « Médina »',
      'col.p1.desc': 'Cuir pleine fleur · cognac, café, noir',
      'col.p2.name': 'Sac à main « Aïcha »',
      'col.p2.desc': 'Cuir pleine fleur · cognac, rouge, bleu marine, noir',
      'col.p3.name': 'Sac de voyage « Atlas »',
      'col.p3.desc': 'Cuir pleine fleur · cognac, café',
      'col.badge.bestseller': 'Best-seller',
      'col.badge.limited': 'Édition limitée',
      'col.cta': 'Commander',

      'story.eyebrow': 'Notre histoire',
      'story.title.html': 'De la tannerie Chouara <em>à vos mains.</em>',
      'story.p1': "NOOR FÈS, c'est la rencontre entre un savoir-faire millénaire et une vision moderne de la maroquinerie. Chaque pièce est tannée végétalement, coupée, et cousue à la main dans les ateliers du quartier des tanneurs de Fès.",
      'story.p2.html': "Nous travaillons en direct avec une famille d'artisans, sans intermédiaire. C'est ce qui nous permet d'offrir un cuir <strong>pleine fleur</strong> — le plus noble — à un prix que vous ne trouverez nulle part ailleurs au Maroc.",
      'story.check.1': 'Cuir pleine fleur tanné aux pigments naturels',
      'story.check.2': 'Coutures sellier à la main, fil ciré',
      'story.check.3': 'Doublure coton, accastillage en laiton massif',
      'story.check.4': 'Signature gravée au fer chaud sur chaque pièce',
      'story.caption': 'Tannerie Chouara, Fès — XIᵉ siècle',

      'mat.eyebrow': 'La matière',
      'mat.title.html': "Le cuir pleine fleur de Fès, <em>une signature.</em>",
      'mat.lead': 'Reconnaissez le cuir véritable : il respire, il évolue, il développe une patine unique au fil des années. C\'est la promesse NOOR FÈS.',
      'mat.1.title': 'Pleine fleur',
      'mat.1.text': 'La couche supérieure du cuir, la plus résistante et la plus belle.',
      'mat.2.title': 'Tannage végétal',
      'mat.2.text': 'Écorces de mimosa et grenade — sans chrome, sans produits chimiques.',
      'mat.3.title': 'Couture sellier',
      'mat.3.text': 'Deux aiguilles, un fil ciré, des points qui ne lâchent jamais.',
      'mat.4.title': 'Laiton massif',
      'mat.4.text': 'Boucles, fermoirs et rivets en laiton — qui se patinent avec le cuir.',

      'rev.eyebrow': 'Ils nous font confiance',
      'rev.title.html': '4,9/5 <em>sur plus de 1 200 commandes</em>',
      'rev.1.text': "« Reçu en 48h à Casablanca. Le cuir est incroyable, la couture nickel. Mon mari l'a même volé le lendemain 😅. Merci NOOR FÈS. »",
      'rev.1.author': 'Khadija B. · Casablanca',
      'rev.2.text': "« J'ai longtemps cherché un vrai sac en cuir, pas du synthétique. Là je l'ai. Le service WhatsApp est réactif, livraison rapide. Je recommande à 100%. »",
      'rev.2.author': 'Yassine M. · Rabat',
      'rev.3.text': "« Sac à main pour ma femme, elle ne s'en sépare plus. Qualité bluffante pour le prix, on se croirait dans une marque européenne à 2000 DH. »",
      'rev.3.author': 'Omar T. · Marrakech',

      'cta.eyebrow': 'Une question ? Une commande ?',
      'cta.title.html': 'Notre équipe vous répond sur WhatsApp <em>en moins de 10 minutes.</em>',

      'order.eyebrow': 'Commande express',
      'order.title.html': "Commandez en 30 secondes — <em>paiement à la livraison</em>",
      'order.lead': "Remplissez le formulaire, on vous appelle dans l'heure pour confirmer votre commande. Vous payez en cash à la réception du colis.",
      'form.product': 'Modèle souhaité *',
      'form.product.ph': '— Choisir —',
      'form.color': 'Couleur',
      'form.color.cognac': 'Cognac',
      'form.color.cafe': 'Café',
      'form.color.black': 'Noir',
      'form.color.burgundy': 'Bordeaux',
      'form.color.red': 'Rouge',
      'form.color.navy': 'Bleu marine',
      'form.name': 'Nom complet *',
      'form.name.ph': 'Ex : Khadija El Idrissi',
      'form.phone': 'Téléphone *',
      'form.phone.ph': '06 00 00 00 00',
      'form.city': 'Ville *',
      'form.city.ph': '— Choisir —',
      'form.address': 'Adresse complète *',
      'form.address.ph': 'Quartier, rue, n° appartement...',
      'form.note': "En validant, vous acceptez d'être appelé(e) pour confirmer votre commande. Aucun prépaiement.",
      'form.submit': 'Commander — paiement à la livraison',
      'form.success.html': '<strong>Merci !</strong> Votre commande est enregistrée. Nous vous appelons dans l\'heure pour confirmer.',

      'footer.brand.text': 'Maroquinerie en cuir véritable, faite main par les artisans de Fès. Livrée à votre porte, partout au Maroc.',
      'footer.h.shop': 'Boutique',
      'footer.h.help': 'Aide',
      'footer.h.contact': 'Restons en contact',
      'footer.shop.1': 'Sacs à dos',
      'footer.shop.2': 'Sacs à main',
      'footer.shop.3': 'Sacs de voyage',
      'footer.help.1': 'Nous contacter',
      'footer.help.2': 'Livraison & retours',
      'footer.help.3': 'FAQ',
      'footer.copy': 'Tous droits réservés. Fait avec amour à Fès, Maroc.',

      'product.eyebrow': 'Best-seller · Sac à dos',
      'product.title': 'Sac à dos « Médina »',
      'product.desc': "Notre pièce signature : un sac à dos pleine fleur tanné à Fès, cousu main, doublure coton. Format 35 × 28 × 12 cm, idéal pour le quotidien, l'université ou le voyage léger.",
      'product.color': 'Couleur',
      'product.cta': 'Commander — paiement à la livraison',
      'product.meta.1.html': '✓ <strong>Cuir pleine fleur</strong> tanné végétal à Fès',
      'product.meta.2.html': '✓ <strong>Fait main</strong> · coutures sellier, fil ciré',
      'product.meta.3.html': '✓ <strong>Accastillage en laiton massif</strong>',
      'product.meta.4.html': '✓ <strong>Doublure coton</strong> avec poche zippée',
      'product.meta.5.html': '✓ <strong>Livraison 24-72h</strong> partout au Maroc',
      'product.meta.6.html': "✓ <strong>14 jours pour échanger</strong> ou être remboursé"
    },

    ar: {
      'announce.1': 'التوصيل المجاني ابتداءً من 600 درهم',
      'announce.2': 'الخلاص عند التسليم في جميع أنحاء المغرب',
      'announce.3': 'ضمان الجلد الطبيعي 100%',

      'nav.collection': 'المجموعة',
      'nav.story': 'قصتنا',
      'nav.materials': 'الجلد',
      'nav.reviews': 'آراء الزبناء',
      'nav.contact': 'تواصل معنا',

      'lang.toggle': 'Français',
      'lang.toggle.aria': 'تغيير اللغة إلى الفرنسية',

      'hero.eyebrow': 'جلد طبيعي · صناعة فاس',
      'hero.title.html': 'الجلد الأصلي،<br/><em>مخيط باليد</em> في مدينة فاس.',
      'hero.lead': 'حقائب الظهر، حقائب اليد وحقائب السفر، مصنوعة من طرف معلمين دباغين وسروجيين في حي الشوارة — مهارة موروثة منذ القرن الحادي عشر.',
      'hero.cta.primary': 'اكتشف المجموعة',
      'hero.cta.ghost': 'قصتنا',
      'hero.badge.1': '100%',
      'hero.badge.1.label': 'جلد طبيعي',
      'hero.badge.2': 'صناعة يدوية',
      'hero.badge.2.label': 'في فاس',
      'hero.badge.3': 'التوصيل',
      'hero.badge.3.label': '24-72 ساعة',
      'hero.badge.4': 'الخلاص',
      'hero.badge.4.label': 'عند التسليم',

      'trust.1.title': 'جلد طبيعي مضمون',
      'trust.1.text': 'جلد كامل الحبيبات مدبوغ في فاس. إذا لم يكن جلداً حقيقياً، نرجع لك دراهمك.',
      'trust.2.title': 'الخلاص عند التسليم',
      'trust.2.text': 'تخلص نقداً فقط حين يسلمك الموزع الطلبية. مخاطرة صفر.',
      'trust.3.title': 'التوصيل في 24-72 ساعة',
      'trust.3.text': 'الدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير وجميع مدن المملكة.',
      'trust.4.title': 'راضي أو نسترجع الدراهم',
      'trust.4.text': '14 يوم لتغيير رأيك. تبديل أو استرجاع، بدون أسئلة.',

      'col.eyebrow': 'المجموعة',
      'col.title.html': 'قطع خالدة، <em>مصممة لتدوم</em>.',
      'col.lead': 'كل حقيبة NOOR FÈS فريدة من نوعها: لون الجلد، الخياطة اليدوية والتوقيع المحفور بالنار تحكي روح المدينة.',
      'col.p1.name': 'حقيبة الظهر «المدينة»',
      'col.p1.desc': 'جلد كامل الحبيبات · بني فاتح، بني داكن، أسود',
      'col.p2.name': 'حقيبة اليد «عائشة»',
      'col.p2.desc': 'جلد كامل الحبيبات · بني فاتح، أحمر، أزرق كحلي، أسود',
      'col.p3.name': 'حقيبة السفر «أطلس»',
      'col.p3.desc': 'جلد كامل الحبيبات · بني فاتح، بني داكن',
      'col.badge.bestseller': 'الأكثر مبيعاً',
      'col.badge.limited': 'إصدار محدود',
      'col.cta': 'اطلب الآن',

      'story.eyebrow': 'قصتنا',
      'story.title.html': 'من دباغة الشوارة <em>إلى يديك.</em>',
      'story.p1': 'NOOR FÈS هي لقاء بين مهارة عريقة ورؤية حديثة للجلديات. كل قطعة مدبوغة نباتياً، مقطوعة ومخيطة باليد في ورشات حي الدباغين بفاس.',
      'story.p2.html': 'نشتغل مباشرة مع عائلة من الحرفيين، بدون وسطاء. هذا ما يمكننا من تقديم <strong>جلد كامل الحبيبات</strong> — الأنبل — بثمن لن تجدوه في أي مكان آخر بالمغرب.',
      'story.check.1': 'جلد كامل الحبيبات مدبوغ بالأصباغ الطبيعية',
      'story.check.2': 'خياطة سراج يدوية بخيط مشمع',
      'story.check.3': 'بطانة قطنية وملحقات نحاس صافي',
      'story.check.4': 'توقيع محفور بالنار على كل قطعة',
      'story.caption': 'دباغة الشوارة، فاس — القرن 11',

      'mat.eyebrow': 'المادة',
      'mat.title.html': 'الجلد الكامل لفاس، <em>توقيعنا.</em>',
      'mat.lead': 'تعرف على الجلد الحقيقي: يتنفس، يتطور، يكتسب لوناً فريداً مع مرور السنين. هذا هو وعد NOOR FÈS.',
      'mat.1.title': 'كامل الحبيبات',
      'mat.1.text': 'الطبقة العليا من الجلد، الأقوى والأجمل.',
      'mat.2.title': 'الدباغة النباتية',
      'mat.2.text': 'لحاء الميموزا والرمان — بدون كروم ولا مواد كيميائية.',
      'mat.3.title': 'خياطة السراج',
      'mat.3.text': 'إبرتان، خيط مشمع، غرز لا تنفك أبداً.',
      'mat.4.title': 'نحاس صافي',
      'mat.4.text': 'الإبزيمات والمشابك والمسامير من النحاس — يتلون مع الجلد.',

      'rev.eyebrow': 'يثقون بنا',
      'rev.title.html': '4.9/5 <em>على أكثر من 1200 طلبية</em>',
      'rev.1.text': '«وصلت في 48 ساعة للدار البيضاء. الجلد رائع، الخياطة ممتازة. حتى راجلي خداها مني! شكراً NOOR FÈS.»',
      'rev.1.author': 'خديجة ب. · الدار البيضاء',
      'rev.2.text': '«مدة طويلة وأنا كنقلب على حقيبة جلد حقيقي، ماشي سانتيتيك. الآن لقيتها. خدمة الواتساب سريعة، التوصيل في الوقت. ننصح بها 100%.»',
      'rev.2.author': 'ياسين م. · الرباط',
      'rev.3.text': '«حقيبة يد لزوجتي، ما بقتش تفارقها. جودة مدهشة بالثمن، كنحس بحال شي ماركة أوروبية ب 2000 درهم.»',
      'rev.3.author': 'عمر ت. · مراكش',

      'cta.eyebrow': 'عندك سؤال؟ بغيتي تطلب؟',
      'cta.title.html': 'فريقنا كيجاوب على واتساب <em>في أقل من 10 دقائق.</em>',

      'order.eyebrow': 'الطلب السريع',
      'order.title.html': 'اطلب في 30 ثانية — <em>الخلاص عند التسليم</em>',
      'order.lead': 'عمر الاستمارة، غادي نعيطو ليك في غضون ساعة باش نأكدو الطلبية. تخلص نقداً عند التوصيل.',
      'form.product': 'المنتج المطلوب *',
      'form.product.ph': '— اختر —',
      'form.color': 'اللون',
      'form.color.cognac': 'بني فاتح',
      'form.color.cafe': 'بني داكن',
      'form.color.black': 'أسود',
      'form.color.burgundy': 'عنابي',
      'form.color.red': 'أحمر',
      'form.color.navy': 'أزرق كحلي',
      'form.name': 'الاسم الكامل *',
      'form.name.ph': 'مثال: خديجة الإدريسي',
      'form.phone': 'رقم الهاتف *',
      'form.phone.ph': '06 00 00 00 00',
      'form.city': 'المدينة *',
      'form.city.ph': '— اختر —',
      'form.address': 'العنوان الكامل *',
      'form.address.ph': 'الحي، الشارع، رقم الشقة...',
      'form.note': 'عند التأكيد، أنت توافق على أن نتصل بك للتأكد من الطلب. لا يوجد دفع مسبق.',
      'form.submit': 'اطلب الآن — الخلاص عند التسليم',
      'form.success.html': '<strong>شكراً!</strong> طلبك وصلنا. غادي نعيطو ليك في غضون ساعة باش نأكدو.',

      'footer.brand.text': 'جلديات بالجلد الطبيعي، صنع يدوي من طرف حرفيي فاس. توصيل لبابك في كل أنحاء المغرب.',
      'footer.h.shop': 'المتجر',
      'footer.h.help': 'مساعدة',
      'footer.h.contact': 'بقى معنا',
      'footer.shop.1': 'حقائب الظهر',
      'footer.shop.2': 'حقائب اليد',
      'footer.shop.3': 'حقائب السفر',
      'footer.help.1': 'تواصل معنا',
      'footer.help.2': 'التوصيل والإرجاع',
      'footer.help.3': 'الأسئلة الشائعة',
      'footer.copy': 'جميع الحقوق محفوظة. صُنع بحب في فاس، المغرب.',

      'product.eyebrow': 'الأكثر مبيعاً · حقيبة ظهر',
      'product.title': 'حقيبة الظهر «المدينة»',
      'product.desc': 'قطعتنا المميزة: حقيبة ظهر بجلد كامل الحبيبات مدبوغ بفاس، مخيطة يدوياً، بطانة قطنية. الحجم 35 × 28 × 12 سم، مثالية للاستعمال اليومي، الجامعة أو السفر الخفيف.',
      'product.color': 'اللون',
      'product.cta': 'اطلب الآن — الخلاص عند التسليم',
      'product.meta.1.html': '✓ <strong>جلد كامل الحبيبات</strong> مدبوغ نباتياً بفاس',
      'product.meta.2.html': '✓ <strong>صناعة يدوية</strong> · خياطة سراج بخيط مشمع',
      'product.meta.3.html': '✓ <strong>ملحقات نحاس صافي</strong>',
      'product.meta.4.html': '✓ <strong>بطانة قطنية</strong> مع جيب مغلق بسحاب',
      'product.meta.5.html': '✓ <strong>التوصيل في 24-72 ساعة</strong> لجميع أنحاء المغرب',
      'product.meta.6.html': '✓ <strong>14 يوماً للتبديل</strong> أو استرجاع الدراهم'
    }
  };

  function getInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'fr' || saved === 'ar') return saved;
    var nav = (navigator.language || 'fr').toLowerCase();
    return nav.indexOf('ar') === 0 ? 'ar' : 'fr';
  }

  function applyLang(lang) {
    var d = dict[lang] || dict.fr;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body && document.body.classList.toggle('is-rtl', lang === 'ar');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var val = d[key];
      if (val == null) return;
      var asAttr = el.getAttribute('data-i18n-attr');
      if (asAttr) {
        el.setAttribute(asAttr, val);
      } else if (key.endsWith('.html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    // Toggle button label
    var toggleBtns = document.querySelectorAll('[data-lang-toggle]');
    toggleBtns.forEach(function (btn) {
      btn.textContent = d['lang.toggle'];
      btn.setAttribute('aria-label', d['lang.toggle.aria']);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function toggleLang() {
    var current = document.documentElement.getAttribute('lang') || 'fr';
    applyLang(current === 'fr' ? 'ar' : 'fr');
  }

  // Expose minimal API
  window.NoorI18n = { apply: applyLang, toggle: toggleLang, dict: dict };

  // Boot
  function boot() {
    applyLang(getInitialLang());
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-lang-toggle]');
      if (btn) {
        e.preventDefault();
        toggleLang();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
