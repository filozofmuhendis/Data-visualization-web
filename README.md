# MSA Gösterge Paneli (Next.js)

Bu repo, askeri operasyon odaklı bir gösterge panelinin (dashboard) Next.js ile geliştirilmiş, statik/demo sürümünü içerir. Komutan, Analist ve Sağlık panolarını tek bir düzen içerisinde görüntüleyebilir, taktik harita ve sağlık durumu gibi görselleştirmeleri inceleyebilirsiniz. Arayüz Türkçe lokalize edilmiştir.

## Özellikler
- TopBar: Sayfa üstünde breadcrumb, arama ve hızlı aksiyonlar.
- NavBar: Ana sayfa ve panolara hızlı erişim (Giriş bağlantısı kaldırıldı).
- Yönetici Paneli: Ana sayfada Komutan/Analist/Sağlık özet panelleri yan yana.
- StatCard: Ana sayfada KPI kartları (Birimler, Uyarılar, Sağlık Uyarıları).
- Taktik Harita (TacticalMap): Hareketli birim görselleştirmesi; `friendly`, `enemy`, `neutral` tarafları destekler.
- Türkçe arayüz: Başlıklar, butonlar, çipler ve metinlerin tamamı Türkçedir.
- Hızlı Giriş: Giriş sayfasında roller için doğrudan panolara geçiş (form kaldırıldı).

## Kurulum
1. Bağımlılıkları yükleyin:
   - `npm install`
2. Geliştirme sunucusunu başlatın:
   - `npm run dev`
3. Tarayıcıda açın:
   - `http://localhost:3000/` (yoğunluk varsa otomatik `3001` portu kullanılır)

## Proje Yapısı
```
src/
  app/
    analyst/          # Analist panosu sayfası
    commander/        # Komutan panosu sayfası
    health/           # Sağlık panosu sayfası
    login/            # Hızlı giriş seçenekleri (form kaldırıldı)
    globals.css       # Tema ve yardımcı sınıflar
    layout.tsx        # Uygulama yerleşimi, TopBar entegrasyonu
    page.tsx          # Ana sayfa, KPI ve Yönetici Paneli
  components/
    AdminPanel.tsx    # Komutan/Analist/Sağlık özet panelleri grid içinde
    NavBar.tsx        # Üst menü (marka ve sayfa linkleri)
    TopBar.tsx        # Breadcrumb, arama ve aksiyonlar
    StatCard.tsx      # Basit KPI kartı bileşeni
    TacticalMap.tsx   # SVG tabanlı taktik harita görselleştirmesi
```

## Geliştirme Notları
- Tema: Koyu arayüz; `globals.css` içinde `--bg`, `--text`, `--accent` vb. CSS değişkenleri.
- Grid yardımcıları: `grid`, `grid-2`, `grid-2-balanced`, `grid-3-balanced` ve boşluk yardımcıları (`.mt-2`).
- Bileşenler:
  - `TopBar`: sayfa üstünde durum çipleri, arama ve aksiyon butonları.
  - `StatCard`: `title`, `value`, `trendLabel` ile KPI gösterimi.
  - `TacticalMap`: `units: Unit[]`, `height`, `showGrid`, `speedMs` prop’ları.
    - `Unit` tipi: `{ id: string; name: string; side: 'friendly' | 'enemy' | 'neutral'; path: { x: number; y: number }[] }`
    - Birimlerin pozisyonu `path` dizisi üzerinden animasyonlu olarak ilerler.
  - `AdminPanel`: üç paneli (Komutan/Analist/Sağlık) aynı düzen ile gösterir.

## Kullanım
- Ana sayfa (`/`):
  - KPI kartlarını ve Yönetici Panelini görüntüler.
  - Komutan/Analist/Sağlık kartlarından ilgili panoya geçiş yapabilirsiniz.
- Giriş (`/login`):
  - Kimlik doğrulama kaldırılmıştır.
  - “Hızlı Giriş” seçenekleri ile panolara doğrudan erişin.
- Panolar:
  - Komutan (`/commander`), Analist (`/analyst`), Sağlık (`/health`): Paneller Türkçe ve ortak görsel düzenle sunulur.

## Komutlar
- `npm run dev`: Geliştirme sunucusunu çalıştırır.
- `npm run build`: Üretim derlemesi oluşturur.
- `npm start`: Üretim sunucusunu başlatır (Next.js yapılandıysa).

## Dağıtım
- Vercel önerilir; Next.js projelerinde otomatik yapı ve dağıtım sağlanır.
- Yerel geliştirme sırasında port çakışması olursa Next.js farklı bir port (ör. `3001`) kullanır.

## Lisans
Bu proje demo amaçlıdır. Kurum içi veya kişisel kullanım senaryolarında, lisans gereksinimlerinizi uygun biçimde belirleyiniz.