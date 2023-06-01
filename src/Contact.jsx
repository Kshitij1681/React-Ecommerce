import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <h2 className="common-heading">Feel Free to Contact Us</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28037.22646939179!2d77.17638673835654!3d28.55013864282182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2127da1cf23%3A0xd89ebc21c669134d!2sHauz%20Khas%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1683485682891!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: "0" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mzbqyvnv" method="post" className="contact-inputs">
            <input type="text" name="Username" placeholder="Username" required autoComplete="off" />
            <input type="email" name="Email" placeholder="Email" required autoComplete="off" />
            <textarea name="Message" id="" cols="30" rows="10" placeholder="Enter Your Message" autoComplete="off" required></textarea>
            <input type="submit" value="SEND" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;
