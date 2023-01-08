import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Tiết kiệm thời gian, tiết kiệm tiền!</h1>
      <span className="mailDesc">Gửi ý kiến phản hồi của các bạn về dịch vụ và phục vụ của chúng tôi</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Phản hồi" />
        <button className="btn-sub">Gửi</button>
      </div>
    </div>
  )
}

export default MailList