import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toastify

function ContactForm() {
  const [result, showresult] = useState(false);
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_bn9dh39", "template_qim88lm", formRef.current, {
        publicKey: "rTovarWJC2HfQcEt-",
      })
      .then(
        (result) => {
          showresult(true);
          toast.success("Your Message has been successfully sent."); // Show success toast
        },
        (error) => {
          console.log(error.text);
          toast.error("An error occurred while sending your message. Please try again later."); // Show error toast
        }
      );

    e.target.reset();
  };

  return (
    <>
      <form ref={formRef} onSubmit={sendEmail}>
        <div className="rn-form-group">
          <input type="text" name="from_name" placeholder="Your Name" required />
        </div>

        <div className="rn-form-group">
          <input type="email" name="from_email" placeholder="Your Email" required />
        </div>

        <div className="rn-form-group">
          <input type="text" name="from_phone" placeholder="Phone Number" required />
        </div>

        <div className="rn-form-group">
          <input type="text" name="from_subject" placeholder="Subject" required />
        </div>

        <div className="rn-form-group">
          <textarea name="message" placeholder="Your Message" required></textarea>
        </div>

        <div className="rn-form-group">
          <button
            className="rn-button-style--2 btn-solid"
            type="submit"
            value="submit"
            name="submit"
            id="mc-embedded-subscribe"
          >
            Submit Now
          </button>
        </div>
      </form>

      {/* ToastContainer is needed to show the toasts */}
      <ToastContainer 
        position="top-right"
        autoClose={3000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          width: "400px", // Adjust width here as needed
          height:'900px',
          marginTop:'300px',
          marginRight:'900px',
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}

export default ContactForm;
