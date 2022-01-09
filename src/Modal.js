const Modal = ({ data, action }) => (
  <div class="modal">
    <div class="modal-box">
      <div class="content">
        <div className="content x">You win!</div>
        <div className="content y">
          <div class="modal-btn" onClick={() => action("OK")}>
            OK
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Modal
