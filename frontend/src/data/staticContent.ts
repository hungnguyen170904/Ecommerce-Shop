export const staticContent: Record<string, { title: string, content: string }> = {
  about: {
    title: "Giới Thiệu Về Chúng Tôi",
    content: `
      <h2 class="text-center">Chào mừng đến với Hệ sinh thái Thương Mại Điện Tử Tương Lai</h2>
      <p class="text-center text-xl text-slate-500 mb-12 max-w-3xl mx-auto">Được thành lập vào năm 2026, chúng tôi tự hào là một trong những nền tảng thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm tuyệt vời và đáng tin cậy nhất.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h3 class="text-indigo-600 mt-0">Sứ Mệnh</h3>
          <p>Kết nối người tiêu dùng với những sản phẩm chất lượng cao nhất, mức giá cạnh tranh nhất. Hỗ trợ các nhà bán lẻ và thương hiệu phát triển doanh nghiệp của họ trên nền tảng kỹ thuật số một cách bùng nổ.</p>
        </div>
        <div class="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" alt="Sứ mệnh" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 md:p-12 rounded-[32px] mb-16 text-center border border-indigo-100">
        <h3 class="mt-0">Tầm Nhìn Của Chúng Tôi</h3>
        <p class="text-xl font-medium text-slate-700 max-w-2xl mx-auto">"Trở thành hệ sinh thái thương mại số 1 tại Đông Nam Á, nơi mọi nhu cầu mua sắm đều được đáp ứng chỉ bằng một cú chạm mượt mà."</p>
      </div>
      
      <h3 class="text-center mb-10">Giá Trị Cốt Lõi</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:-translate-y-2 transition-all duration-300 group">
          <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
          </div>
          <h4 class="font-bold text-xl mb-3">Chất lượng Đỉnh cao</h4>
          <p class="text-slate-600 mb-0">Cam kết 100% hàng chính hãng, nguồn gốc rõ ràng, được kiểm định nghiêm ngặt.</p>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:-translate-y-2 transition-all duration-300 group">
          <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h4 class="font-bold text-xl mb-3">Tốc độ Thần tốc</h4>
          <p class="text-slate-600 mb-0">Hệ thống kho bãi thông minh giúp giao hàng siêu tốc trong vòng 2h tại các đô thị lớn.</p>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:-translate-y-2 transition-all duration-300 group">
          <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <h4 class="font-bold text-xl mb-3">Tận tâm Hết mình</h4>
          <p class="text-slate-600 mb-0">Đội ngũ chuyên gia CSKH hoạt động 24/7, luôn đồng hành cùng trải nghiệm của bạn.</p>
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
      <h2 class="text-center text-3xl font-extrabold text-slate-900 border-none mb-4">Mạng Lưới Giao Hàng Toàn Quốc</h2>
      <p class="text-center text-xl text-slate-500 mb-12 max-w-3xl mx-auto">Chúng tôi hợp tác với các đơn vị vận chuyển hàng đầu để đảm bảo mọi đơn hàng dù nhỏ nhất cũng đến tay bạn nhanh chóng và an toàn nhất.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-8 rounded-3xl shadow-soft border border-indigo-100 flex items-start gap-6 hover:shadow-hover transition-shadow">
          <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h3 class="mt-0 text-xl font-bold text-slate-900">Miễn Phí Vận Chuyển</h3>
            <p class="text-slate-600 mb-0">Áp dụng cho mọi đơn hàng từ <strong>500.000 VNĐ</strong> trở lên trên toàn quốc.</p>
          </div>
        </div>
        
        <div class="bg-white p-8 rounded-3xl shadow-soft border border-indigo-100 flex items-start gap-6 hover:shadow-hover transition-shadow">
          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <h3 class="mt-0 text-xl font-bold text-slate-900">Phí Cố Định Siêu Rẻ</h3>
            <p class="text-slate-600 mb-0">Chỉ <strong>25.000 VNĐ</strong> cho mọi đơn hàng dưới 500K.</p>
          </div>
        </div>
      </div>
      
      <h3 class="text-center mb-8 border-none text-2xl">Thời Gian Giao Hàng Dự Kiến</h3>
      <div class="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        <table class="w-full text-left border-collapse bg-white m-0">
          <thead>
            <tr class="bg-slate-50 text-slate-900">
              <th class="p-5 font-bold border-b border-slate-200">Khu Vực</th>
              <th class="p-5 font-bold border-b border-slate-200">Dịch Vụ Giao Hàng</th>
              <th class="p-5 font-bold border-b border-slate-200">Thời Gian Dự Kiến</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-semibold text-slate-800">Hà Nội & TP. Hồ Chí Minh</td>
              <td class="p-5"><span class="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">Hỏa tốc</span></td>
              <td class="p-5 font-bold text-indigo-600">Trong vòng 2H</td>
            </tr>
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-semibold text-slate-800">Các Tỉnh/Thành Phố Lớn</td>
              <td class="p-5"><span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Tiêu chuẩn</span></td>
              <td class="p-5">1 - 2 ngày làm việc</td>
            </tr>
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-semibold text-slate-800">Vùng Sâu, Vùng Xa</td>
              <td class="p-5"><span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">Kinh tế</span></td>
              <td class="p-5">3 - 5 ngày làm việc</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-8 flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium">
        <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Lưu ý: Thời gian giao hàng có thể kéo dài hơn dự kiến trong các dịp Siêu Sale (11/11, Black Friday) hoặc điều kiện thời tiết khắc nghiệt.</span>
      </div>
    `
  },
  returns: {
    title: "Chính Sách Trả Hàng & Hoàn Tiền",
    content: `
      <h2 class="text-center text-3xl font-extrabold text-slate-900 border-none mb-4">Đổi Trả Dễ Dàng. Miễn Phí.</h2>
      <p class="text-center text-xl text-slate-500 mb-12 max-w-2xl mx-auto">Nhằm mang lại sự an tâm tuyệt đối khi mua sắm, chúng tôi áp dụng chính sách đổi trả miễn phí tận nhà trong vòng 7 ngày.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
          <div class="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">1</div>
          <h4 class="font-bold text-slate-900 mb-2">Tạo Yêu Cầu</h4>
          <p class="text-sm text-slate-600">Vào mục Đơn hàng, chọn sản phẩm và lý do đổi trả.</p>
        </div>
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
          <div class="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">2</div>
          <h4 class="font-bold text-slate-900 mb-2">Giao Hàng Tới Lấy</h4>
          <p class="text-sm text-slate-600">Shipper sẽ đến tận nhà thu hồi hàng trong 24h miễn phí.</p>
        </div>
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
          <div class="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">3</div>
          <h4 class="font-bold text-slate-900 mb-2">Hoàn Tiền Siêu Tốc</h4>
          <p class="text-sm text-slate-600">Tiền hoàn về tài khoản/thẻ ngay khi kho nhận được hàng.</p>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1 bg-white p-8 border border-slate-200 rounded-3xl shadow-sm">
          <h3 class="text-emerald-600 mt-0 flex items-center gap-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Được Đổi Trả</h3>
          <ul class="text-slate-600 space-y-2 mt-4 pl-0 list-none">
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Sản phẩm còn nguyên tem mác, chưa qua sử dụng.</span></li>
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất.</span></li>
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Giao sai màu sắc, mẫu mã so với đơn hàng gốc.</span></li>
          </ul>
        </div>
        
        <div class="flex-1 bg-rose-50 p-8 border border-rose-100 rounded-3xl">
          <h3 class="text-rose-600 mt-0 flex items-center gap-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> TỪ CHỐI Đổi Trả</h3>
          <ul class="text-slate-700 space-y-2 mt-4 pl-0 list-none">
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> <span>Sản phẩm số (Thẻ cào, phần mềm, mã voucher).</span></li>
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> <span>Sản phẩm đã bị trầy xước, vô nước do người dùng.</span></li>
            <li class="flex items-start gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> <span>Đồ lót, đồ bơi đã tháo seal (vì lý do vệ sinh).</span></li>
          </ul>
        </div>
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
      <p class="text-xl text-slate-500 mb-10">Chúng tôi luôn tìm kiếm những tài năng đam mê công nghệ và thương mại điện tử để cùng nhau xây dựng hệ sinh thái lớn mạnh nhất.</p>
      
      <h3 class="mb-6 border-none">Vị Trí Đang Tuyển (Hot Jobs)</h3>
      
      <div class="grid gap-6">
        <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center group">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors mt-0 mb-2">Senior Fullstack Developer (React/NestJS)</h4>
              <div class="flex flex-wrap gap-3 mt-2">
                <span class="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg> TP. Hồ Chí Minh</span>
                <span class="bg-emerald-50 text-emerald-600 text-xs px-3 py-1.5 rounded-lg font-bold border border-emerald-200">$1,500 - $3,000</span>
                <span class="bg-rose-50 text-rose-600 text-xs px-3 py-1.5 rounded-lg font-bold border border-rose-200">Gấp</span>
              </div>
            </div>
          </div>
          <button class="mt-6 md:mt-0 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all">Ứng Tuyển</button>
        </div>
        
        <div class="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center group">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors mt-0 mb-2">Chuyên Viên Trải Nghiệm Khách Hàng (CX)</h4>
              <div class="flex flex-wrap gap-3 mt-2">
                <span class="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg> Hà Nội</span>
                <span class="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg font-bold border border-indigo-200">Đãi ngộ cạnh tranh</span>
              </div>
            </div>
          </div>
          <button class="mt-6 md:mt-0 px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all border border-slate-200">Ứng Tuyển</button>
        </div>
      </div>
      
      <div class="mt-16 bg-slate-900 rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 mix-blend-overlay"></div>
        <h3 class="text-white mt-0 border-none relative z-10 text-3xl">Không tìm thấy vị trí phù hợp?</h3>
        <p class="text-slate-300 text-lg max-w-2xl mx-auto relative z-10">Chúng tôi luôn mở cửa chào đón nhân tài. Hãy gửi CV Portfolio của bạn về hòm thư tuyển dụng, chúng tôi sẽ liên hệ khi có vị trí thích hợp.</p>
        <a href="mailto:hr@ecommerce.com" class="inline-block mt-6 px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-indigo-50 transition-colors relative z-10 shadow-xl">Gửi CV Trực Tiếp</a>
      </div>
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
      <h2 class="text-center text-3xl font-extrabold text-slate-900 border-none mb-4">Thanh Toán An Toàn & Đa Dạng</h2>
      <p class="text-center text-xl text-slate-500 mb-12 max-w-2xl mx-auto">Chúng tôi cung cấp nhiều phương thức thanh toán linh hoạt, được mã hóa bảo mật 256-bit chuẩn quốc tế.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="p-8 bg-white border border-slate-200 rounded-3xl shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h3 class="mt-0 text-xl font-bold text-slate-900">1. Thanh toán khi nhận hàng (COD)</h3>
          <p class="text-slate-600">Thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng. Trải nghiệm "Nhận hàng rồi mới trả tiền" an toàn tuyệt đối, phù hợp cho khách mua lần đầu.</p>
        </div>
        
        <div class="p-8 bg-white border border-slate-200 rounded-3xl shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all border-l-4 border-l-indigo-500">
          <div class="flex justify-between items-start mb-6">
            <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
            </div>
            <span class="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Khuyên dùng</span>
          </div>
          <h3 class="mt-0 text-xl font-bold text-slate-900">2. Chuyển khoản VietQR</h3>
          <p class="text-slate-600">Mở ứng dụng ngân hàng, quét mã QR hiển thị ở bước thanh toán. Hệ thống tự động điền số tiền và nội dung, miễn phí 100% giao dịch.</p>
        </div>
        
        <div class="p-8 bg-slate-50 border border-slate-200 rounded-3xl">
          <div class="w-14 h-14 bg-slate-200 text-slate-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          </div>
          <h3 class="mt-0 text-xl font-bold text-slate-500">3. Thẻ tín dụng (Visa/Mastercard)</h3>
          <p class="text-slate-500">Tính năng này đang được chúng tôi tích hợp cùng cổng thanh toán quốc tế và sẽ sớm ra mắt trong thời gian tới.</p>
          <div class="mt-4 flex gap-2">
            <div class="w-10 h-6 bg-slate-200 rounded"></div>
            <div class="w-10 h-6 bg-slate-200 rounded"></div>
            <div class="w-10 h-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    `
  }
};
