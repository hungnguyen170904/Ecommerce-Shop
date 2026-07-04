export const staticContent: Record<string, { title: string, content: string }> = {
  about: {
    title: "Giới Thiệu Về Chúng Tôi",
    content: `
      <h2>Chào mừng đến với hệ thống E-Commerce của chúng tôi</h2>
      <p>Được thành lập vào năm 2026, chúng tôi tự hào là một trong những nền tảng thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm tuyệt vời và đáng tin cậy nhất cho khách hàng trên toàn quốc.</p>
      
      <h3>Sứ Mệnh</h3>
      <p>Sứ mệnh của chúng tôi là kết nối người tiêu dùng với những sản phẩm chất lượng cao nhất, với mức giá cạnh tranh nhất, đồng thời hỗ trợ các nhà bán lẻ và thương hiệu phát triển doanh nghiệp của họ trên nền tảng kỹ thuật số.</p>
      
      <h3>Tầm Nhìn</h3>
      <p>Trở thành hệ sinh thái thương mại số 1 tại Đông Nam Á, nơi mọi nhu cầu mua sắm đều được đáp ứng chỉ bằng một cú chạm.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h4 class="font-bold text-indigo-700 mb-2">Chất lượng</h4>
          <p class="text-sm text-slate-600">Cam kết 100% hàng chính hãng, nguồn gốc rõ ràng.</p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h4 class="font-bold text-indigo-700 mb-2">Tốc độ</h4>
          <p class="text-sm text-slate-600">Giao hàng siêu tốc trong 2h tại các thành phố lớn.</p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h4 class="font-bold text-indigo-700 mb-2">Tận tâm</h4>
          <p class="text-sm text-slate-600">Đội ngũ hỗ trợ 24/7 sẵn sàng giải đáp mọi thắc mắc.</p>
        </div>
      </div>
    `
  },
  terms: {
    title: "Điều Khoản Dịch Vụ",
    content: `
      <p>Chào mừng bạn đến với nền tảng của chúng tôi. Khi sử dụng dịch vụ, bạn đồng ý tuân thủ các điều khoản dưới đây. Xin vui lòng đọc kỹ.</p>
      
      <h3>1. Chấp nhận điều khoản</h3>
      <p>Bằng việc đăng ký tài khoản và sử dụng dịch vụ, bạn xác nhận đã đọc, hiểu và đồng ý với toàn bộ các điều khoản và điều kiện được nêu tại đây.</p>
      
      <h3>2. Quyền và nghĩa vụ của người dùng</h3>
      <ul>
        <li>Cung cấp thông tin chính xác khi đăng ký tài khoản.</li>
        <li>Bảo mật thông tin đăng nhập và chịu trách nhiệm cho mọi hoạt động dưới tài khoản của mình.</li>
        <li>Không sử dụng nền tảng cho các mục đích bất hợp pháp, lừa đảo hoặc vi phạm thuần phong mỹ tục.</li>
      </ul>
      
      <h3>3. Quyền sở hữu trí tuệ</h3>
      <p>Tất cả nội dung, hình ảnh, mã nguồn và thiết kế trên website đều thuộc bản quyền của chúng tôi. Việc sao chép mà không có sự cho phép bằng văn bản là vi phạm pháp luật.</p>
      
      <h3>4. Giới hạn trách nhiệm</h3>
      <p>Chúng tôi không chịu trách nhiệm cho những thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ, bao gồm nhưng không giới hạn ở việc mất dữ liệu hoặc lợi nhuận.</p>
    `
  },
  privacy: {
    title: "Chính Sách Bảo Mật",
    content: `
      <p>Bảo vệ dữ liệu cá nhân của bạn là ưu tiên hàng đầu của chúng tôi. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.</p>
      
      <h3>1. Thông tin chúng tôi thu thập</h3>
      <p>Chúng tôi thu thập thông tin khi bạn đăng ký tài khoản, đặt hàng, hoặc tương tác với website, bao gồm: Họ tên, Email, Số điện thoại, Địa chỉ giao hàng và Lịch sử mua hàng.</p>
      
      <h3>2. Cách sử dụng thông tin</h3>
      <ul>
        <li>Xử lý và giao đơn hàng của bạn.</li>
        <li>Gửi thông báo cập nhật về trạng thái đơn hàng.</li>
        <li>Cải thiện trải nghiệm mua sắm cá nhân hóa.</li>
        <li>Ngăn chặn các hoạt động gian lận và bảo vệ bảo mật hệ thống.</li>
      </ul>
      
      <h3>3. Chia sẻ dữ liệu</h3>
      <p>Chúng tôi cam kết <strong>không bán</strong> thông tin cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ được chia sẻ với các đối tác vận chuyển và thanh toán để hoàn tất giao dịch.</p>
      
      <div class="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
        <p class="text-sm mb-0 text-slate-700">Nếu bạn có bất kỳ câu hỏi nào về quyền riêng tư, vui lòng liên hệ <a href="mailto:privacy@ecommerce.com" class="text-indigo-600 font-medium hover:underline">privacy@ecommerce.com</a>.</p>
      </div>
    `
  },
  shipping: {
    title: "Chính Sách Vận Chuyển",
    content: `
      <h2>Thông tin vận chuyển & Giao hàng</h2>
      <p>Chúng tôi hợp tác với các đơn vị vận chuyển hàng đầu để đảm bảo đơn hàng đến tay bạn nhanh chóng và an toàn nhất.</p>
      
      <h3>Phí Vận Chuyển</h3>
      <ul>
        <li><strong>Miễn phí vận chuyển</strong> cho tất cả đơn hàng từ 500.000 VNĐ.</li>
        <li>Phí đồng giá 25.000 VNĐ cho các đơn hàng dưới 500.000 VNĐ.</li>
      </ul>
      
      <h3>Thời Gian Giao Hàng</h3>
      <table class="w-full text-left border-collapse mt-4">
        <thead>
          <tr class="bg-slate-100">
            <th class="p-3 border border-slate-200 font-bold">Khu Vực</th>
            <th class="p-3 border border-slate-200 font-bold">Thời Gian Dự Kiến</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border border-slate-200">Hà Nội & TP. Hồ Chí Minh</td>
            <td class="p-3 border border-slate-200">1 - 2 ngày làm việc</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Các Tỉnh/Thành Khác</td>
            <td class="p-3 border border-slate-200">3 - 5 ngày làm việc</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200">Vùng sâu, vùng xa, hải đảo</td>
            <td class="p-3 border border-slate-200">5 - 7 ngày làm việc</td>
          </tr>
        </tbody>
      </table>
      
      <p class="mt-4 italic text-sm text-slate-500">* Lưu ý: Thời gian giao hàng có thể kéo dài hơn dự kiến trong các dịp Lễ, Tết hoặc điều kiện thời tiết khắc nghiệt.</p>
    `
  },
  returns: {
    title: "Chính Sách Trả Hàng & Hoàn Tiền",
    content: `
      <h2>Quy Định Đổi Trả</h2>
      <p>Nhằm mang lại sự an tâm tuyệt đối khi mua sắm, chúng tôi áp dụng chính sách đổi trả miễn phí trong vòng 7 ngày kể từ ngày nhận hàng.</p>
      
      <h3>Điều Kiện Áp Dụng</h3>
      <ul>
        <li>Sản phẩm còn nguyên tem mác, nguyên bao bì, chưa qua sử dụng.</li>
        <li>Sản phẩm bị lỗi do nhà sản xuất (hư hỏng, không hoạt động).</li>
        <li>Giao sai sản phẩm (sai mẫu, màu, dung lượng) so với đơn đặt hàng.</li>
      </ul>
      
      <h3>Quy Trình Hoàn Tiền</h3>
      <ol>
        <li>Liên hệ Bộ phận CSKH qua Hotline hoặc tạo yêu cầu "Hoàn trả" trực tiếp trên Đơn hàng.</li>
        <li>Đóng gói sản phẩm cẩn thận và gửi lại cho chúng tôi qua đường bưu điện hoặc bưu cục gần nhất.</li>
        <li>Sau khi nhận và kiểm tra hàng hoàn, hệ thống sẽ tự động xử lý hoàn tiền vào tài khoản hoặc thẻ tín dụng của bạn trong 3-5 ngày làm việc.</li>
      </ol>
      
      <div class="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-xl">
        <h4 class="font-bold text-rose-700 flex items-center gap-2 mb-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Sản phẩm KHÔNG áp dụng đổi trả
        </h4>
        <ul class="text-rose-600 text-sm mb-0">
          <li>Thẻ cào, phần mềm số, mã voucher.</li>
          <li>Sản phẩm đã bị trầy xước, rơi vỡ do người dùng.</li>
          <li>Đồ lót, đồ bơi (vì lý do vệ sinh).</li>
        </ul>
      </div>
    `
  },
  help: {
    title: "Trung Tâm Hỗ Trợ",
    content: `
      <h2>Bạn cần hỗ trợ gì hôm nay?</h2>
      <p>Đừng lo lắng, chúng tôi luôn ở đây để giúp đỡ bạn. Vui lòng tham khảo các câu hỏi thường gặp hoặc liên hệ trực tiếp với chúng tôi.</p>
      
      <h3>Câu Hỏi Thường Gặp (FAQ)</h3>
      
      <div class="space-y-4 mt-4">
        <div class="border border-slate-200 rounded-lg p-4">
          <h4 class="font-bold text-slate-800">Làm thế nào để tôi theo dõi đơn hàng?</h4>
          <p class="text-sm text-slate-600 mt-2">Bạn có thể đăng nhập vào tài khoản, chọn mục "Quản lý đơn hàng". Trạng thái và lộ trình giao hàng sẽ được hiển thị chi tiết tại đây.</p>
        </div>
        
        <div class="border border-slate-200 rounded-lg p-4">
          <h4 class="font-bold text-slate-800">Tôi có thể thay đổi địa chỉ sau khi đã đặt hàng không?</h4>
          <p class="text-sm text-slate-600 mt-2">Nếu đơn hàng đang ở trạng thái "Chờ xử lý", bạn có thể tự hủy đơn và đặt lại. Nếu đơn hàng đã được "Giao cho đơn vị vận chuyển", chúng tôi rất tiếc không thể thay đổi địa chỉ.</p>
        </div>
        
        <div class="border border-slate-200 rounded-lg p-4">
          <h4 class="font-bold text-slate-800">Tôi quên mật khẩu, phải làm sao?</h4>
          <p class="text-sm text-slate-600 mt-2">Tại trang Đăng nhập, hãy bấm vào nút "Quên mật khẩu", nhập Email của bạn. Chúng tôi sẽ gửi một liên kết để bạn thiết lập lại mật khẩu mới.</p>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-slate-200">
        <h3>Liên Hệ Trực Tiếp</h3>
        <p>Hotline: <strong>1900 1234</strong> (8:00 - 22:00 hàng ngày)</p>
        <p>Email: <strong>support@ecommerce.com</strong></p>
      </div>
    `
  },
  careers: {
    title: "Tuyển Dụng",
    content: `
      <h2>Tham Gia Cùng Chúng Tôi</h2>
      <p>Chúng tôi luôn tìm kiếm những tài năng đam mê công nghệ và thương mại điện tử để cùng nhau xây dựng hệ sinh thái lớn mạnh nhất.</p>
      
      <h3>Vị Trí Đang Mở</h3>
      
      <div class="mt-6 space-y-4">
        <div class="p-5 border border-slate-200 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer group">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-bold text-lg text-slate-900 group-hover:text-indigo-600">Senior React/Node.js Developer</h4>
              <p class="text-sm text-slate-500">Kỹ thuật • Toàn thời gian • TP. Hồ Chí Minh</p>
            </div>
            <span class="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold">Mới</span>
          </div>
        </div>
        
        <div class="p-5 border border-slate-200 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer group">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-bold text-lg text-slate-900 group-hover:text-indigo-600">Chuyên Viên Marketing (Growth)</h4>
              <p class="text-sm text-slate-500">Marketing • Toàn thời gian • Hà Nội</p>
            </div>
          </div>
        </div>
        
        <div class="p-5 border border-slate-200 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer group">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-bold text-lg text-slate-900 group-hover:text-indigo-600">Nhân Viên CSKH Tiếng Anh</h4>
              <p class="text-sm text-slate-500">Vận hành • Theo ca • Remote</p>
            </div>
          </div>
        </div>
      </div>
      
      <p class="mt-8">Gửi CV của bạn về <a href="mailto:hr@ecommerce.com" class="text-indigo-600 font-bold hover:underline">hr@ecommerce.com</a> để ứng tuyển.</p>
    `
  },
  'shopping-guide': {
    title: "Hướng Dẫn Mua Hàng",
    content: `
      <h2>Cách Thức Đặt Hàng Trực Tuyến</h2>
      <p>Việc mua sắm trên hệ thống của chúng tôi vô cùng đơn giản. Dưới đây là các bước chi tiết để bạn có thể sở hữu ngay những món hàng ưng ý.</p>
      
      <ol class="space-y-4">
        <li><strong>Tìm kiếm sản phẩm:</strong> Sử dụng thanh tìm kiếm hoặc duyệt qua các danh mục ở trang chủ.</li>
        <li><strong>Chọn sản phẩm:</strong> Nhấp vào hình ảnh hoặc tên sản phẩm để xem thông tin chi tiết, màu sắc, kích thước và giá cả.</li>
        <li><strong>Thêm vào giỏ:</strong> Chọn phân loại (nếu có), nhập số lượng và nhấp vào nút "Thêm vào giỏ hàng" hoặc "Mua ngay".</li>
        <li><strong>Thanh toán:</strong> Tại trang giỏ hàng, kiểm tra lại thông tin sản phẩm, áp dụng mã giảm giá (nếu có), điền địa chỉ nhận hàng và chọn phương thức thanh toán.</li>
        <li><strong>Xác nhận:</strong> Sau khi đặt hàng thành công, bạn sẽ nhận được thông báo mã đơn hàng. Bạn có thể theo dõi tiến độ giao hàng tại mục "Quản lý đơn hàng".</li>
      </ol>
      
      <p class="mt-6 text-sm text-slate-500">Nếu bạn gặp bất kỳ khó khăn nào trong quá trình đặt hàng, đừng ngần ngại gọi Hotline 1900 1234 để được nhân viên hỗ trợ thao tác trực tiếp.</p>
    `
  },
  'selling-guide': {
    title: "Hướng Dẫn Bán Hàng",
    content: `
      <h2>Bắt Đầu Hành Trình Kinh Doanh</h2>
      <p>Trở thành đối tác bán hàng trên nền tảng của chúng tôi chưa bao giờ dễ dàng đến thế. Hệ thống của chúng tôi cung cấp mọi công cụ bạn cần để tiếp cận hàng triệu khách hàng tiềm năng.</p>
      
      <h3>1. Tạo gian hàng</h3>
      <p>Truy cập vào <a href="/seller" class="text-indigo-600 font-bold hover:underline">Kênh Người Bán</a>, nhấp vào "Đăng ký" và điền thông tin doanh nghiệp/cá nhân của bạn. Quá trình xét duyệt thường diễn ra trong vòng 24h.</p>
      
      <h3>2. Quản lý sản phẩm</h3>
      <p>Sau khi có tài khoản, truy cập Admin Dashboard để thêm sản phẩm mới. Hãy chuẩn bị những hình ảnh sắc nét và mô tả thật chi tiết để thu hút khách hàng.</p>
      
      <h3>3. Xử lý đơn hàng</h3>
      <p>Khi có đơn hàng mới, hệ thống sẽ gửi thông báo đến bạn. Nhiệm vụ của bạn là đóng gói hàng hóa cẩn thận và cập nhật trạng thái "Sẵn sàng giao" để Đơn vị vận chuyển đến lấy hàng.</p>
      
      <h3>4. Rút tiền</h3>
      <p>Doanh thu từ các đơn hàng giao thành công sẽ được ghi nhận vào Số dư tài khoản bán hàng. Bạn có thể rút tiền về tài khoản ngân hàng bất cứ lúc nào, tiền sẽ về trong vòng 24h.</p>
    `
  },
  'payment-guide': {
    title: "Hướng Dẫn Thanh Toán",
    content: `
      <h2>Các Phương Thức Thanh Toán</h2>
      <p>Chúng tôi cung cấp nhiều phương thức thanh toán linh hoạt và an toàn để đáp ứng nhu cầu của mọi khách hàng.</p>
      
      <div class="space-y-6 mt-6">
        <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="flex items-center gap-2 text-indigo-700 mt-0">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            1. Thanh toán khi nhận hàng (COD)
          </h3>
          <p class="text-slate-600">Thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng khi bạn nhận được sản phẩm. Đây là phương thức an toàn nhất nếu bạn mua sắm lần đầu tiên.</p>
        </div>
        
        <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="flex items-center gap-2 text-indigo-700 mt-0">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            2. Chuyển khoản ngân hàng (Mã QR)
          </h3>
          <p class="text-slate-600">Hệ thống của chúng tôi hỗ trợ quét mã VietQR. Bạn chỉ cần mở ứng dụng ngân hàng, quét mã QR hiển thị ở bước cuối cùng. Số tiền và nội dung chuyển khoản sẽ được điền hoàn toàn tự động, đảm bảo giao dịch không bao giờ bị sai sót.</p>
        </div>
        
        <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="flex items-center gap-2 text-indigo-700 mt-0">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            3. Thẻ tín dụng/Ghi nợ (Visa/Mastercard)
          </h3>
          <p class="text-slate-600 text-sm italic">* Tính năng này đang được chúng tôi tích hợp và sẽ sớm ra mắt trong thời gian tới để đa dạng hóa trải nghiệm thanh toán của bạn.</p>
        </div>
      </div>
    `
  }
};
