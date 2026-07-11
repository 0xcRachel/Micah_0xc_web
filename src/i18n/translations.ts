/**
 * Bilingual content (English ⇄ Vietnamese) for the Micah 0xC site.
 * Content faithfully reflects the Micah Launcher project README.
 */
export type Lang = 'en' | 'vi'

export const translations = {
  en: {
    nav: {
      brand: 'Micah 0xC',
      features: 'Features',
      architecture: 'Architecture',
      howItWorks: 'How it works',
      license: 'License',
      download: 'Download .exe',
      comingSoon: 'Coming soon',
      langToggle: 'Tiếng Việt',
    },
    hero: {
      overline: 'Lightweight Tauri Game Launcher',
      titleLine1: 'Your games,',
      titleLine2: 'restored in seconds.',
      subtitle:
        'Micah 0xC reads Steam’s appmanifest_*.acf files at lightning speed, binds your device with stable hardware-independent IDs, and recovers your library in one click when SteamTools fails — no re-download needed.',
      ctaPrimary: 'Download for Windows',
      ctaSecondary: 'View on GitHub',
      versionLabel: 'Latest version',
      stats: [
        { value: '3-day', label: 'short-lived license' },
        { value: '1', label: 'device per license' },
        { value: '0', label: 'passwords to remember' },
      ],
    },
    features: {
      overline: 'What it does',
      title: 'Built for resilience, designed for speed.',
      subtitle:
        'A compact launcher that solves the real problems of managing a paid game library.',
      items: [
        {
          title: 'Ultra-fast Steam manifest access',
          body: 'Reads appmanifest_*.acf files instantly through Tauri’s lightweight runtime, slashing manifest retrieval time for optimal library integration.',
        },
        {
          title: 'Hardware-independent device binding',
          body: 'A Device ID generated on first run — not tied to CPU, SSD or motherboard. Survives drive swaps, RAM upgrades and BIOS changes without breaking your license.',
        },
        {
          title: 'Discord authentication',
          body: 'No separate account system. Login is built entirely on your Discord account via the bot, so you never memorize another password.',
        },
        {
          title: 'One-click game recovery',
          body: 'When SteamTools fails and wipes your games, Micah restores the correct manifest and re-attaches the game to Steam in seconds. Never re-download again.',
        },
        {
          title: 'Force update control',
          body: 'Every launch checks the required version. Outdated clients lock down and show an update screen — patching security holes without fragmentation.',
        },
        {
          title: 'Zero-trust client',
          body: 'Neither the app nor the bot ever touches the database. Every decision happens on the server, so reverse-engineering the client bypasses nothing.',
        },
      ],
    },
    architecture: {
      overline: 'How it’s built',
      title: 'The server is the single source of truth.',
      subtitle:
        'No client — neither the App nor the Bot — ever touches the database directly. Everything flows through a central API layer.',
      flow: {
        app: { name: 'Tauri Desktop App', detail: 'React + TypeScript + Vite' },
        api: { name: 'Fastify API', detail: 'Node.js + TypeScript — the decision layer' },
        bot: { name: 'Discord Bot', detail: 'discord.js — /bind · /getkey · /reset-device' },
        db: { name: 'MySQL', detail: 'Users · licenses · sessions · audit' },
      },
      principle: 'Zero-trust at the client.',
    },
    howItWorks: {
      overline: 'The user journey',
      title: 'From first launch to login in four steps.',
      steps: [
        {
          step: '01',
          title: 'First launch',
          body: 'The app automatically generates a unique Device ID and displays it for you to copy. No installation friction.',
        },
        {
          step: '02',
          title: 'Link Discord',
          body: 'Run /bind DEVICE_ID in Discord. The bot calls the API, stores the binding in MySQL, and verifies your device.',
        },
        {
          step: '03',
          title: 'Get a license',
          body: 'Run /getkey. The system checks your device is bound, then issues a fresh 3-day license locked to one device.',
        },
        {
          step: '04',
          title: 'Launch & play',
          body: 'On login the app checks license validity, Discord match, device match, expiry and version — all at once.',
        },
      ],
    },
    license: {
      overline: 'License policy',
      title: 'Tight control. Less leakage.',
      subtitle:
        'Designed to tackle the biggest headache of key-selling models: one purchase shared among many users.',
      items: [
        {
          title: '3-day lifespan',
          body: 'Each license is short-lived. After three days a brand-new license must be issued — no renewals, no reuse.',
        },
        {
          title: 'One device',
          body: 'Every license binds to exactly one device. Sharing a license between machines is practically pointless.',
        },
        {
          title: 'Easily reset',
          body: 'Device ID is a management mechanism, not a security silver bullet. Reset it any time via /reset-device.',
        },
      ],
    },
    download: {
      overline: 'Get Micah',
      title: 'Download the launcher.',
      subtitle:
        'A lightweight Tauri binary that starts fast and uses a fraction of Electron’s RAM. Windows build ready.',
      cta: 'Download .exe',
      size: '~12 MB',
      comingSoon: 'Coming soon — drop your email below to be notified.',
      note: 'Requires Windows 10 or later. Free during early access.',
    },
    subscribe: {
      overline: 'Stay in the loop',
      title: 'Get notified when we ship.',
      subtitle:
        'Release notes, security patches, and early-access invites. No spam — unsubscribe anytime.',
      placeholder: 'you@example.com',
      button: 'Subscribe',
      success: 'You’re on the list. Check your inbox to confirm.',
      error: 'Please enter a valid email address.',
      discordTitle: 'Prefer Discord?',
      discordBody: 'Bind your device, grab a license, and talk to the team in real time.',
      discordCta: 'Join Discord',
    },
    footer: {
      tagline: 'A solid reference architecture for passwordless, Discord-based launcher licensing.',
      sections: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
      },
      links: {
        features: 'Features',
        architecture: 'Architecture',
        howItWorks: 'How it works',
        license: 'License policy',
        download: 'Download',
        github: 'GitHub',
        discord: 'Discord',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      copyright: 'Built with React & GSAP. Inspired by warm, editorial design.',
      madeWith: 'Not affiliated with Valve or Steam.',
    },
  },

  vi: {
    nav: {
      brand: 'Micah 0xC',
      features: 'Tính năng',
      architecture: 'Kiến trúc',
      howItWorks: 'Cách hoạt động',
      license: 'Bản quyền',
      download: 'Tải .exe',
      comingSoon: 'Sắp ra mắt',
      langToggle: 'English',
    },
    hero: {
      overline: 'Trình khởi chạy game Tauri siêu nhẹ',
      titleLine1: 'Thư viện game,',
      titleLine2: 'khôi phục trong vài giây.',
      subtitle:
        'Micah 0xC đọc các file appmanifest_*.acf của Steam với tốc độ chớp nhoáng, liên kết thiết bị bằng ID ổn định không phụ thuộc phần cứng, và khôi phục thư viện chỉ trong một cú nhấp khi SteamTools gặp lỗi — không cần tải lại.',
      ctaPrimary: 'Tải cho Windows',
      ctaSecondary: 'Xem trên GitHub',
      versionLabel: 'Phiên bản mới nhất',
      stats: [
        { value: '3 ngày', label: 'giấy phép ngắn hạn' },
        { value: '1', label: 'thiết bị mỗi giấy phép' },
        { value: '0', label: 'mật khẩu cần nhớ' },
      ],
    },
    features: {
      overline: 'Ứng dụng làm gì',
      title: 'Bền bỉ theo thời gian, tối ưu về tốc độ.',
      subtitle:
        'Một trình khởi chạy gọn nhẹ, giải quyết đúng những vấn đề thực tế khi quản lý thư viện game trả phí.',
      items: [
        {
          title: 'Truy cập manifest Steam siêu nhanh',
          body: 'Đọc file appmanifest_*.acf ngay lập tức qua runtime Tauri siêu nhẹ, rút ngắn tối đa thời gian truy xuất manifest để tích hợp thư viện mượt mà.',
        },
        {
          title: 'Liên kết thiết bị không phụ thuộc phần cứng',
          body: 'Device ID được tạo ở lần chạy đầu — không gắn với CPU, SSD hay bo mạch. Vẫn hoạt động khi bạn thay ổ cứng, nâng RAM hay cập nhật BIOS.',
        },
        {
          title: 'Xác thực bằng Discord',
          body: 'Không cần hệ thống tài khoản riêng. Đăng nhập hoàn toàn dựa trên tài khoản Discord qua bot, bạn không phải nhớ thêm mật khẩu nào nữa.',
        },
        {
          title: 'Khôi phục game trong một cú nhấp',
          body: 'Khi SteamTools lỗi và xoá sạch game, Micah khôi phục manifest đúng và gắn lại game vào Steam trong vài giây. Không bao giờ phải tải lại.',
        },
        {
          title: 'Kiểm soát cập nhật bắt buộc',
          body: 'Mỗi lần mở app đều kiểm tra phiên bản yêu cầu. Phiên bản cũ sẽ khoá và hiện màn cập nhật — vá lỗ hổng bảo mật mà không gây phân mảnh.',
        },
        {
          title: 'Client không đáng tin (zero-trust)',
          body: 'App hay bot đều không bao giờ chạm trực tiếp vào database. Mọi quyết định nằm ở server, nên dịch ngược client cũng không xoá được gì.',
        },
      ],
    },
    architecture: {
      overline: 'Cấu trúc dự án',
      title: 'Server là nguồn sự thật duy nhất.',
      subtitle:
        'Không một client nào — dù App hay Bot — trực tiếp chạm vào cơ sở dữ liệu. Mọi thứ đều đi qua một lớp API trung tâm.',
      flow: {
        app: { name: 'Tauri Desktop App', detail: 'React + TypeScript + Vite' },
        api: { name: 'Fastify API', detail: 'Node.js + TypeScript — lớp quyết định' },
        bot: { name: 'Discord Bot', detail: 'discord.js — /bind · /getkey · /reset-device' },
        db: { name: 'MySQL', detail: 'Người dùng · giấy phép · phiên · audit' },
      },
      principle: 'Zero-trust tại client.',
    },
    howItWorks: {
      overline: 'Hành trình người dùng',
      title: 'Từ lần mở đầu đến đăng nhập trong bốn bước.',
      steps: [
        {
          step: '01',
          title: 'Lần mở đầu',
          body: 'App tự tạo một Device ID duy nhất và hiển thị để bạn sao chép. Không rắc rối khi cài đặt.',
        },
        {
          step: '02',
          title: 'Liên kết Discord',
          body: 'Chạy /bind DEVICE_ID trong Discord. Bot gọi API, lưu liên kết vào MySQL và xác thực thiết bị của bạn.',
        },
        {
          step: '03',
          title: 'Nhận giấy phép',
          body: 'Chạy /getkey. Hệ thống kiểm tra thiết bị đã liên kết rồi cấp giấy phép 3 ngày mới, khoá cho một thiết bị.',
        },
        {
          step: '04',
          title: 'Khởi chạy & chơi',
          body: 'Khi đăng nhập, app kiểm tra giấy phép hợp lệ, khớp Discord, khớp thiết bị, hết hạn và phiên bản — tất cả cùng lúc.',
        },
      ],
    },
    license: {
      overline: 'Chính sách giấy phép',
      title: 'Kiểm soát chặt. Rò rỉ ít.',
      subtitle:
        'Giải quyết ngay vấn đề lớn nhất của mô hình bán key: một lần mua nhưng chia sẻ cho nhiều người.',
      items: [
        {
          title: 'Thời hạn 3 ngày',
          body: 'Mỗi giấy phép tồn tại ngắn hạn. Sau ba ngày phải cấp giấy phép mới — không gia hạn, không dùng lại.',
        },
        {
          title: 'Một thiết bị',
          body: 'Mỗi giấy phép gắn đúng một thiết bị. Chia sẻ giấy phép giữa các máy gần như vô nghĩa.',
        },
        {
          title: 'Dễ đặt lại',
          body: 'Device ID chỉ là cơ chế quản lý, không phải bảo mật tuyệt đối. Đặt lại bất cứ lúc nào qua /reset-device.',
        },
      ],
    },
    download: {
      overline: 'Tải Micah',
      title: 'Tải trình khởi chạy.',
      subtitle:
        'Một binary Tauri siêu nhẹ, khởi động nhanh và chỉ tiêu tốn một phần nhỏ RAM so với Electron. Sẵn sàng bản Windows.',
      cta: 'Tải .exe',
      size: '~12 MB',
      comingSoon: 'Sắp ra mắt — để lại email bên dưới để được thông báo.',
      note: 'Yêu cầu Windows 10 trở lên. Miễn phí trong giai đoạn early access.',
    },
    subscribe: {
      overline: 'Cập nhật mới nhất',
      title: 'Nhận thông báo khi ra mắt.',
      subtitle:
        'Ghi chú phát hành, bản vá bảo mật và lời mời early-access. Không spam — huỷ bất cứ lúc nào.',
      placeholder: 'ban@example.com',
      button: 'Đăng ký',
      success: 'Bạn đã có trong danh sách. Kiểm tra hộp thư để xác nhận.',
      error: 'Vui lòng nhập địa chỉ email hợp lệ.',
      discordTitle: 'Thích dùng Discord?',
      discordBody: 'Liên kết thiết bị, lấy giấy phép và trò chuyện trực tiếp với đội ngũ.',
      discordCta: 'Tham gia Discord',
    },
    footer: {
      tagline: 'Một kiến trúc tham chiếu vững chắc cho mô hình launcher xác thực qua Discord, không cần mật khẩu.',
      sections: {
        product: 'Sản phẩm',
        resources: 'Tài nguyên',
        legal: 'Pháp lý',
      },
      links: {
        features: 'Tính năng',
        architecture: 'Kiến trúc',
        howItWorks: 'Cách hoạt động',
        license: 'Chính sách giấy phép',
        download: 'Tải xuống',
        github: 'GitHub',
        discord: 'Discord',
        privacy: 'Riêng tư',
        terms: 'Điều khoản',
      },
      copyright: 'Xây dựng bằng React & GSAP. Lấy cảm hứng từ thiết kế ấm áp, mang phong cách tạp chí.',
      madeWith: 'Không liên kết với Valve hay Steam.',
    },
  },
}

export type TranslationShape = (typeof translations)['en']
