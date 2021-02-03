import "./App.css"
import AnnotatorComponent from "./image-annotation/AnnotatorComponent"
import { strokeColors } from "./common/helpers"

function App() {
  function sendSubmitData(data) {
    console.log(data)
  }

  function sendResolveData(data) {
    console.log(data)
  }
  function sendDeleteData(data) {
    console.log(data)
  }
  function sendEditComment(data) {
    console.log(data)
  }

  function sendAddReply(data) {
    console.log(data)
  }
  function sendEditReply(data) {
    console.log(data)
  }
  function sendDeleteReply(data) {
    console.log(data)
  }

  return (
    <div className="App" styles={{ height: "100%" }}>
      <AnnotatorComponent
        onSubmit={sendSubmitData}
        onResolve={sendResolveData}
        onDelete={sendDeleteData}
        onEditComment={sendEditComment}
        onAddReply={sendAddReply}
        onEditReply={sendEditReply}
        onDeleteReply={sendDeleteReply}
        isResolvable={false}
        isEditable={true}
        username="Javeria Nisar"
        commentsList={
          localStorage.getItem("comments")
            ? JSON.parse(localStorage.getItem("comments"))
            : []
        }
        drawedRect={
          localStorage.getItem("drawedRect")
            ? JSON.parse(localStorage.getItem("drawedRect"))
            : []
        }
        strokeStyle={strokeColors.ORANGE}
        imageAvatar="https://storage.googleapis.com/brandverse/6438409036759/6438409036759_H1N0_s1.jpg"
        imagePreview="https://storage.googleapis.com/brandverse/6438409036759/6438409036759_H1N0_s1.jpg"
      />
    </div>
  )
}

export default App
