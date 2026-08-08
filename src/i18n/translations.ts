/**
 * Bilingual content (English ⇄ Vietnamese) for the Micah 0xC site.
 * Content faithfully reflects the Micah 0xC PR_MARKETING copy pack.
 */
export type Lang = 'en' | 'vi'

export const translations = {
  en: {
    nav: {
      brand: 'Micah 0xC',
      features: 'Features',
      tech: 'Tech',
      security: 'Security',
      pricing: 'Pricing',
      faq: 'FAQ',
      download: 'Download',
      comingSoon: 'Coming soon',
    },
    hero: {
      overline: 'All-in-one game experience manager',
      titleLine1: 'Your games,',
      titleLine2: 'one hub.',
      subtitle:
        'Micah 0xC is a desktop app that helps you search games, check ratings & requirements, monitor your PC in real time, and manage your Steam experience — all from one place. Built with Tauri + React: light, fast, and secure.',
      ctaPrimary: 'Download for Windows',
      ctaSecondary: 'View on GitHub',
      versionLabel: 'Latest version',
      stats: [
        { value: '0.6.0', label: 'latest version' },
        { value: '100%', label: 'local-first processing' },
        { value: '6', label: 'core features' },
      ],
    },
    socialProof: {
      title: 'Trusted by gamers who want control',
      items: ['Open source', 'v0.6.0', 'Windows', 'Tauri + React', 'Free forever'],
    },
    features: {
      overline: 'What it does',
      title: 'Everything you need to own your gaming.',
      subtitle: 'Six carefully crafted modules that turn game management into one beautiful place.',
      items: [
        {
          title: 'Smart game search',
          body: 'Find games by name, then view detailed info, ratings, system requirements, and categories (single-player, online PvP, achievements, cloud…) right inside the app.',
        },
        {
          title: 'Real-time system monitoring',
          body: 'Keep an eye on your PC — CPU, RAM, GPU, OS — through the System Info Card right on the main screen.',
        },
        {
          title: 'Favorite games collection',
          body: 'Save the games you love and revisit them anytime. A handy like mechanism means you never lose track of the titles you’re waiting for.',
        },
        {
          title: 'Steam Manager',
          body: 'A dedicated panel with 5 tabs — Status, Games, Logs, Settings, and Updater — for complete control over your Steam integration.',
        },
        {
          title: 'One-click Lua script manager',
          body: 'Download Lua scripts from the Manifest Hub with a single click. They’re auto-saved with clean AppID names, auto-imported into Steam, and activated instantly — no restart needed.',
        },
        {
          title: 'Seamless updates & maintenance',
          body: 'Check for new versions and update from multiple channels. Multi-domain GitHub support with DNS latency measurement, plus professional MSI & NSIS installers.',
        },
      ],
    },
    screenshots: {
      overline: 'Take a look inside',
      title: 'One app. Your whole gaming life.',
      subtitle: 'Home dashboard, Steam Manager, profile Lightbox, and Dark mode — designed to feel fast and intentional.',
      items: [
        {
          title: 'Home dashboard',
          caption: 'Search games, watch your System Info Card, and browse your favorites — all on the main screen.',
        },
        {
          title: 'Steam Manager',
          caption: '5 tabs of control: Status · Games · Logs · Settings · Updater.',
        },
        {
          title: 'Profile Lightbox',
          caption: 'Detailed game profiles open in a smooth overlay — no page jumps.',
        },
        {
          title: 'Dark mode',
          caption: 'Switch themes seamlessly with a consistent LED-green accent.',
        },
      ],
    },
    tech: {
      overline: 'Built with modern tech',
      title: 'Light. Fast. Secure by design.',
      subtitle: 'Engineered on a stack that stays out of the way and respects your hardware.',
      items: [
        { label: 'Platform', value: 'Windows', detail: 'Native desktop app for Windows 10+.' },
        { label: 'Frontend', value: 'React 19 + Rsbuild', detail: 'Fast builds and a smooth GSAP-powered interface.' },
        { label: 'Backend', value: 'Tauri 2 (Rust)', detail: 'Lightweight, secure, and RAM-efficient — a fraction of Electron’s footprint.' },
        { label: 'Theme', value: 'Dark & Light', detail: 'Consistent LED-green accent across both modes.' },
        { label: 'Packaging', value: 'MSI + NSIS', detail: 'Professional installers for Windows.' },
        { label: 'Version', value: '0.6.0', detail: 'Current release, actively maintained.' },
      ],
    },
    security: {
      overline: 'Security & privacy',
      title: 'Safety is the priority.',
      subtitle: 'Your data stays on your machine. That’s the whole point.',
      items: [
        { title: 'Local-first by design', body: 'Data is processed primarily on your device — nothing sensitive needs to leave your computer.' },
        { title: 'Tauri/Rust architecture', body: 'A minimized attack surface compared to heavyweight web-based wrappers.' },
        { title: 'No data collection', body: 'No sensitive telemetry. Updates go through version-checked channels.' },
        { title: 'Open source', body: 'Inspect the code, contribute, and build it yourself.' },
      ],
      commitment: 'Built to support gamers — please use it in line with platform terms and local laws.',
    },
    pricing: {
      overline: 'Pricing',
      title: 'Free forever. Support if you want.',
      subtitle: 'All core features are free. An optional Supporter tier keeps the project alive.',
      plans: [
        {
          name: 'Free',
          price: '0₫',
          period: 'forever',
          description: 'Everything you need to get started.',
          features: ['Smart game search', 'System monitoring', 'Steam Manager', 'Lua script manager'],
          cta: 'Download now',
          highlighted: false,
        },
        {
          name: 'Supporter',
          price: 'Optional',
          period: 'donation',
          description: 'Fund development and get priority features.',
          features: ['Everything in Free', 'Priority feature requests', 'Community badge'],
          cta: 'Support the project',
          highlighted: true,
        },
      ],
    },
    faq: {
      overline: 'FAQ',
      title: 'Frequently asked questions.',
      subtitle: 'Quick answers to the things people ask us most.',
      items: [
        { q: 'Does Micah 0xC need an account or registration?', a: 'No. The app runs locally and requires no account at all.' },
        { q: 'Is it safe?', a: 'Built with Tauri/Rust, it runs local-first and is fully open source so you can verify it yourself.' },
        { q: 'Is there a macOS/Linux version?', a: 'Windows is the priority right now. The Tauri architecture makes future cross-platform support feasible.' },
        { q: 'How do I update?', a: 'Use the Updater tab inside Steam Manager, or grab the latest build from the releases page.' },
        { q: 'Do I need Steam running?', a: 'Most features work standalone. Steam integration features require Steam installed at the correct path.' },
      ],
    },
    download: {
      overline: 'Get Micah 0xC',
      title: 'Download for Windows.',
      subtitle: 'A lightweight Tauri build that starts fast and uses a fraction of Electron’s RAM. MSI & NSIS installers included.',
      cta: 'Download for Windows',
      size: '~15 MB',
      comingSoon: 'Coming soon — drop your email below to be notified.',
      note: 'Requires Windows 10 or later. Free — no account needed.',
    },
    subscribe: {
      overline: 'Get started',
      title: 'Start free. Right now.',
      subtitle: 'Join the community, get notified on new releases, and share feedback.',
      placeholder: 'you@example.com',
      button: 'Subscribe',
      success: 'You’re on the list. Check your inbox to confirm.',
      error: 'Please enter a valid email address.',
      discordTitle: 'Prefer Discord?',
      discordBody: 'Join the community and talk to the team in real time.',
      discordCta: 'Join Discord',
    },
    footer: {
      tagline: 'Your games. Your rules. One hub — a modern, local-first game experience manager.',
      sections: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
      },
      links: {
        features: 'Features',
        tech: 'Tech stack',
        download: 'Download',
        github: 'GitHub',
        faq: 'FAQ',
        security: 'Security',
        report: 'Report an issue',
        privacy: 'Privacy policy',
        terms: 'Terms of use',
      },
      copyright: '© 2026 Micah 0xC. All rights reserved.',
      builtWith: 'Built with Tauri · React · Rust.',
      madeWith: 'Not affiliated with Valve or Steam.',
    },
  },

  vi: {
    nav: {
      brand: 'Micah 0xC',
      features: 'Tính năng',
      tech: 'Công nghệ',
      security: 'Bảo mật',
      pricing: 'Bảng giá',
      faq: 'FAQ',
      download: 'Tải xuống',
      comingSoon: 'Sắp ra mắt',
    },
    hero: {
      overline: 'Trình quản lý trải nghiệm game — tất cả trong một',
      titleLine1: 'Game của bạn,',
      titleLine2: 'một trung tâm.',
      subtitle:
        'Micah 0xC là ứng dụng desktop tiện lợi giúp bạn tìm kiếm game, xem thông tin & điểm đánh giá, theo dõi tình trạng hệ thống máy tính, và quản lý trải nghiệm Steam của mình — từ một nơi duy nhất. Được xây dựng với công nghệ hiện đại (Tauri + React), nhẹ, nhanh và bảo mật.',
      ctaPrimary: 'Tải ngay cho Windows',
      ctaSecondary: 'Xem trên GitHub',
      versionLabel: 'Phiên bản mới nhất',
      stats: [
        { value: '0.6.0', label: 'phiên bản hiện tại' },
        { value: '100%', label: 'xử lý local-first' },
        { value: '6', label: 'tính năng chính' },
      ],
    },
    socialProof: {
      title: 'Được tin dùng bởi những gamer muốn kiểm soát',
      items: ['Mã nguồn mở', 'v0.6.0', 'Windows', 'Tauri + React', 'Miễn phí mãi mãi'],
    },
    features: {
      overline: 'Ứng dụng làm gì',
      title: 'Mọi thứ bạn cần để làm chủ trải nghiệm game.',
      subtitle: 'Sáu module được thiết kế chỉn chu, biến việc quản lý game thành một nơi duy nhất.',
      items: [
        {
          title: 'Tìm kiếm game thông minh',
          body: 'Tìm game theo tên, xem thông tin chi tiết, điểm đánh giá, hệ thống yêu cầu (system requirements) và danh mục (single-player, online PvP, achievements, cloud…) ngay trong ứng dụng.',
        },
        {
          title: 'Giám sát hệ thống thời gian thực',
          body: 'Theo dõi thông số máy tính của bạn — CPU, RAM, GPU, hệ điều hành — qua card thông tin hệ thống (System Info Card) hiển thị ngay trên màn hình chính.',
        },
        {
          title: 'Bộ sưu tập game yêu thích',
          body: 'Lưu lại những game bạn thích, xem lại nhanh chóng. Cơ chế "like" tiện lợi giúp bạn không bao giờ quên tựa game đang mong chờ.',
        },
        {
          title: 'Trung tâm quản lý Steam',
          body: 'Một panel chuyên dụng với 5 tab đầy đủ — Status, Games, Logs, Settings và Updater — kiểm soát toàn bộ tích hợp Steam của bạn.',
        },
        {
          title: 'Tải & quản lý script Lua tự động',
          body: 'Tải script Lua từ Manifest Hub chỉ với một cú nhấp chuột. Tự động lưu vào thư mục lua_scripts với tên chuẩn AppID + tên game, tự động import vào Steam và kích hoạt ngay — không cần khởi động lại Steam.',
        },
        {
          title: 'Cập nhật & bảo trì liền mạch',
          body: 'Kiểm tra phiên bản mới, cập nhật từ nhiều kênh (channel). Hỗ trợ đa domain GitHub (giải quyết vấn đề kết nối) kèm đo lường độ trễ DNS, cài đặt chuyên nghiệp qua bộ cài MSI & NSIS.',
        },
      ],
    },
    screenshots: {
      overline: 'Nhìn từ bên trong',
      title: 'Một ứng dụng. Toàn bộ thế giới game của bạn.',
      subtitle: 'Home dashboard, Steam Manager, Profile Lightbox và Dark mode — thiết kế nhanh, gọn, có chủ đích.',
      items: [
        {
          title: 'Home dashboard',
          caption: 'Tìm game, xem System Info Card và duyệt bộ sưu tập yêu thích ngay trên màn hình chính.',
        },
        {
          title: 'Steam Manager',
          caption: '5 tab kiểm soát: Status · Games · Logs · Settings · Updater.',
        },
        {
          title: 'Profile Lightbox',
          caption: 'Hồ sơ game chi tiết mở trong overlay mượt mà — không chuyển trang.',
        },
        {
          title: 'Dark mode',
          caption: 'Chuyển theme liền mạch với accent LED green nhất quán.',
        },
      ],
    },
    tech: {
      overline: 'Xây dựng bằng công nghệ hiện đại',
      title: 'Nhẹ. Nhanh. An toàn ngay từ thiết kế.',
      subtitle: 'Được xây dựng trên nền tảng công nghệ tôn trọng phần cứng của bạn.',
      items: [
        { label: 'Nền tảng', value: 'Windows', detail: 'Ứng dụng desktop chạy native trên Windows 10+.' },
        { label: 'Frontend', value: 'React 19 + Rsbuild', detail: 'Build nhanh và giao diện mượt mà nhờ GSAP.' },
        { label: 'Backend', value: 'Tauri 2 (Rust)', detail: 'Nhẹ, nhanh, bảo mật cao — RAM thấp hơn hẳn Electron.' },
        { label: 'Theme', value: 'Dark & Light', detail: 'Accent LED green nhất quán ở cả hai chế độ.' },
        { label: 'Đóng gói', value: 'MSI + NSIS', detail: 'Bộ cài đặt chuyên nghiệp cho Windows.' },
        { label: 'Phiên bản', value: '0.6.0', detail: 'Bản phát hành hiện tại, đang được bảo trì.' },
      ],
    },
    security: {
      overline: 'Bảo mật & quyền riêng tư',
      title: 'An toàn là ưu tiên.',
      subtitle: 'Dữ liệu của bạn ở lại trên máy của bạn. Đó là toàn bộ ý nghĩa.',
      items: [
        { title: 'Local-first ngay từ thiết kế', body: 'Dữ liệu chủ yếu được xử lý trên máy của bạn — không gì nhạy cảm phải rời khỏi máy.' },
        { title: 'Kiến trúc Tauri/Rust', body: 'Giảm thiểu bề mặt tấn công so với các giải pháp web-based đóng gói nặng nề.' },
        { title: 'Không thu thập dữ liệu', body: 'Không có cơ chế thu thập dữ liệu nhạy cảm. Cập nhật qua kênh có kiểm tra phiên bản.' },
        { title: 'Mã nguồn mở', body: 'Bạn có thể tự kiểm tra, đóng góp và tự build.' },
      ],
      commitment: 'Được phát triển với tinh thần hỗ trợ người dùng — vui lòng sử dụng đúng quy định, điều khoản của nền tảng và luật pháp địa phương.',
    },
    pricing: {
      overline: 'Bảng giá',
      title: 'Miễn phí mãi mãi. Ủng hộ nếu bạn muốn.',
      subtitle: 'Toàn bộ tính năng chính đều miễn phí. Gói Supporter tùy chọn giúp dự án phát triển.',
      plans: [
        {
          name: 'Free',
          price: '0₫',
          period: 'mãi mãi',
          description: 'Mọi thứ bạn cần để bắt đầu.',
          features: ['Tìm kiếm game thông minh', 'Giám sát hệ thống', 'Steam Manager', 'Quản lý script Lua'],
          cta: 'Tải ngay',
          highlighted: false,
        },
        {
          name: 'Supporter',
          price: 'Tùy chọn',
          period: 'ủng hộ',
          description: 'Đồng hành phát triển và ưu tiên tính năng mới.',
          features: ['Mọi thứ trong gói Free', 'Ưu tiên tính năng mới', 'Badge cộng đồng'],
          cta: 'Ủng hộ dự án',
          highlighted: true,
        },
      ],
    },
    faq: {
      overline: 'FAQ',
      title: 'Những câu hỏi thường gặp.',
      subtitle: 'Giải đáp nhanh những điều mọi người hỏi nhất.',
      items: [
        { q: 'Micah 0xC có cần tài khoản hoặc đăng ký không?', a: 'Không. Ứng dụng chạy local, không yêu cầu tài khoản nào cả.' },
        { q: 'Có an toàn không?', a: 'Được xây dựng bằng Tauri/Rust, chạy local-first và mã nguồn mở để bạn tự kiểm tra.' },
        { q: 'Có phiên bản macOS/Linux không?', a: 'Hiện tại ưu tiên Windows. Kiến trúc Tauri giúp việc mở rộng nền tảng trong tương lai trở nên khả thi.' },
        { q: 'Làm sao để cập nhật?', a: 'Dùng tab Updater trong Steam Manager hoặc tải bản mới từ trang phát hành.' },
        { q: 'Tôi có cần Steam đang chạy không?', a: 'Hầu hết tính năng dùng được độc lập. Riêng các tính năng quản lý tích hợp sẽ yêu cầu Steam được cài đặt đúng đường dẫn.' },
      ],
    },
    download: {
      overline: 'Tải Micah 0xC',
      title: 'Tải ngay cho Windows.',
      subtitle: 'Bản build Tauri siêu nhẹ, khởi động nhanh và chỉ tiêu tốn một phần nhỏ RAM so với Electron. Kèm bộ cài MSI & NSIS.',
      cta: 'Tải ngay cho Windows',
      size: '~15 MB',
      comingSoon: 'Sắp ra mắt — để lại email bên dưới để được thông báo.',
      note: 'Yêu cầu Windows 10 trở lên. Miễn phí — không cần tài khoản.',
    },
    subscribe: {
      overline: 'Bắt đầu ngay',
      title: 'Bắt đầu miễn phí ngay hôm nay.',
      subtitle: 'Tham gia cộng đồng, nhận thông báo bản phát hành mới và góp ý cho dự án.',
      placeholder: 'ban@example.com',
      button: 'Đăng ký',
      success: 'Bạn đã có trong danh sách. Kiểm tra hộp thư để xác nhận.',
      error: 'Vui lòng nhập địa chỉ email hợp lệ.',
      discordTitle: 'Thích dùng Discord?',
      discordBody: 'Tham gia cộng đồng và trò chuyện trực tiếp với đội ngũ.',
      discordCta: 'Tham gia Discord',
    },
    footer: {
      tagline: 'Game của bạn. Quy tắc của bạn. Một trung tâm — trình quản lý trải nghiệm game hiện đại, local-first.',
      sections: {
        product: 'Sản phẩm',
        resources: 'Tài nguyên',
        legal: 'Pháp lý',
      },
      links: {
        features: 'Tính năng',
        tech: 'Công nghệ',
        download: 'Tải xuống',
        github: 'GitHub',
        faq: 'FAQ',
        security: 'Bảo mật',
        report: 'Báo lỗi',
        privacy: 'Chính sách quyền riêng tư',
        terms: 'Điều khoản sử dụng',
      },
      copyright: '© 2026 Micah 0xC. All rights reserved.',
      builtWith: 'Xây dựng bằng Tauri · React · Rust.',
      madeWith: 'Không liên kết với Valve hay Steam.',
    },
  },
}

export type TranslationShape = (typeof translations)['en']
