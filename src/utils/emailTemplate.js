/*eslint-disable */
module.exports = {
  resetPasswordTemplate: (resetPasswordUrl) => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
          @media screen {
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 400;
              src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
                  format("woff");
            }
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 700;
              src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
                  format("woff");
            }
          }
          /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
       * Remove extra space added to tables and cells in Outlook.
       */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
       * Better fluid images in Internet Explorer.
       */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
       * Remove blue links for iOS devices.
       */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
       * Fix centering issues in Android 4.4.
       */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
       * Collapse table borders to avoid space between cells.
       */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
        </style>
      </head>
      <body style="background-color: #e9ecef">
        <!-- start preheader -->
        <div
          class="preheader"
          style="
            display: none;
            max-width: 0;
            max-height: 0;
            overflow: hidden;
            font-size: 1px;
            line-height: 1px;
            color: #fff;
            opacity: 0;
          "
        >
          A preheader is the short summary text that follows the subject line when
          an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
    
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px">
                    <a
                      href="https://github.com/TNHao/LearningPlatform"
                      target="_blank"
                      style="display: inline-block"
                    >
                      <img
                        src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png"
                        alt="Logo"
                        border="0"
                        width="48"
                        style="
                          display: block;
                          width: 48px;
                          max-width: 48px;
                          min-width: 48px;
                        "
                      />
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
    
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 36px 24px 0;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      border-top: 3px solid #d4dadf;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: -1px;
                        line-height: 48px;
                      "
                    >
                      Forgot your password ?
                    </h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
    
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      Please click the button below to reset your password.
                    </p>
                  </td>
                </tr>
                <!-- end copy -->
    
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td
                                align="center"
                                bgcolor="#1a82e2"
                                style="border-radius: 6px"
                              >
                                <a
                                  href="${resetPasswordUrl}"
                                  target="_blank"
                                  style="
                                    display: inline-block;
                                    padding: 16px 36px;
                                    font-family: 'Source Sans Pro', Helvetica, Arial,
                                      sans-serif;
                                    font-size: 16px;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                  "
                                  >Reset Password</a
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
    
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p>
                      If you're having trouble clicking the "Reset Password"
                      button, copy and paste the URL below into your web browser:
                      <span>
                        <a
                          href="${resetPasswordUrl}"
                          style="color: #467fcf; text-decoration: none"
                          target="_blank"
                        >${resetPasswordUrl}</a>
                      </span>
                    </p>
                    <p>
                      Regards,<br />
                      LearnHub
                    </p>
                  </td>
                </tr>
                <!-- end copy -->
    
                <!-- start copy -->
    
                <!-- end copy -->
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
    
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <!-- start permission -->
                <tr>
                  <td
                    align="center"
                    bgcolor="#e9ecef"
                    style="
                      padding: 12px 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 14px;
                      line-height: 20px;
                      color: #666;
                    "
                  >
                    <p style="margin: 0">
                      You received this email because we received a request to
                      signing up for your account. If you didn't request signing up
                      you can safely delete this email.
                    </p>
                  </td>
                </tr>
                <!-- end permission -->
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
        </table>
        <!-- end body -->
      </body>
    </html>
    `;
  },
  verification: (verificationUrl) => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
          @media screen {
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 400;
              src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
                  format("woff");
            }
            @font-face {
              font-family: "Source Sans Pro";
              font-style: normal;
              font-weight: 700;
              src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
                url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
                  format("woff");
            }
          }
          /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
       * Remove extra space added to tables and cells in Outlook.
       */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
       * Better fluid images in Internet Explorer.
       */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
       * Remove blue links for iOS devices.
       */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
       * Fix centering issues in Android 4.4.
       */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
       * Collapse table borders to avoid space between cells.
       */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
        </style>
      </head>
      <body style="background-color: #e9ecef">
        <!-- start preheader -->
        <div
          class="preheader"
          style="
            display: none;
            max-width: 0;
            max-height: 0;
            overflow: hidden;
            font-size: 1px;
            line-height: 1px;
            color: #fff;
            opacity: 0;
          "
        >
          A preheader is the short summary text that follows the subject line when
          an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
    
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px">
                    <a
                      href="https://github.com/TNHao/LearningPlatform"
                      target="_blank"
                      style="display: inline-block"
                    >
                      <img
                        src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png"
                        alt="Logo"
                        border="0"
                        width="48"
                        style="
                          display: block;
                          width: 48px;
                          max-width: 48px;
                          min-width: 48px;
                        "
                      />
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
    
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 36px 24px 0;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      border-top: 3px solid #d4dadf;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: -1px;
                        line-height: 48px;
                      "
                    >
                      Confirm Your Email Address
                    </h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
    
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p style="margin: 0">
                      Please click the button below to verify your email address.
                    </p>
                  </td>
                </tr>
                <!-- end copy -->
    
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td
                                align="center"
                                bgcolor="#1a82e2"
                                style="border-radius: 6px"
                              >
                                <a
                                  href="${verificationUrl}"
                                  target="_blank"
                                  style="
                                    display: inline-block;
                                    padding: 16px 36px;
                                    font-family: 'Source Sans Pro', Helvetica, Arial,
                                      sans-serif;
                                    font-size: 16px;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                  "
                                  >Verify Email Address</a
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
    
                <!-- start copy -->
                <tr>
                  <td
                    align="left"
                    bgcolor="#ffffff"
                    style="
                      padding: 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 24px;
                    "
                  >
                    <p>
                      If you're having trouble clicking the "Verify Email Address"
                      button, copy and paste the URL below into your web browser:
                      <span>
                        <a
                          href="${verificationUrl}"
                          style="color: #467fcf; text-decoration: none"
                          target="_blank"
                        >${verificationUrl}</a>
                      </span>
                    </p>
                    <p>
                      Regards,<br />
                      LearnHub
                    </p>
                  </td>
                </tr>
                <!-- end copy -->
    
                <!-- start copy -->
    
                <!-- end copy -->
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
    
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px">
              <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <!-- start permission -->
                <tr>
                  <td
                    align="center"
                    bgcolor="#e9ecef"
                    style="
                      padding: 12px 24px;
                      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                      font-size: 14px;
                      line-height: 20px;
                      color: #666;
                    "
                  >
                    <p style="margin: 0">
                      You received this email because we received a request to
                      signing up for your account. If you didn't request signing up
                      you can safely delete this email.
                    </p>
                  </td>
                </tr>
                <!-- end permission -->
              </table>
              <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
        </table>
        <!-- end body -->
      </body>
    </html>
    `;
  },
  invitation: (inviter, groupName, invitarionUrl) => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Email Invitation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style="background-color: #e9ecef">
        <div
          bgcolor="#fafafa"
          marginheight="0"
          marginwidth="0"
          style="
            width: 100% !important;
            min-width: 100%;
            background-color: #fafafa;
            color: #333333;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: normal;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            margin: 0;
            padding: 0;
          "
        >
          <table
            style="
              border-spacing: 0;
              border-collapse: collapse;
              vertical-align: top;
              text-align: center;
              height: 100%;
              width: 100%;
              background-color: #fafafa;
              color: #333333;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: normal;
              line-height: 20px;
              font-size: 14px;
              margin: 0;
              padding: 0;
            "
            bgcolor="#fafafa"
          >
            <tbody>
              <tr
                style="vertical-align: top; text-align: center; padding: 0"
                align="center"
              >
                <td
                  align="center"
                  valign="top"
                  style="
                    word-break: break-word;
                    border-collapse: collapse !important;
                    vertical-align: top;
                    text-align: center;
                    color: #333333;
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-weight: normal;
                    line-height: 20px;
                    font-size: 14px;
                    margin: 0;
                    padding: 0;
                  "
                >
                  <center style="width: 100%; min-width: 580px">
                    <table
                      style="
                        border-spacing: 0;
                        border-collapse: collapse;
                        vertical-align: top;
                        text-align: center;
                        width: 100%;
                        padding: 0px;
                      "
                    >
                      <tbody>
                        <tr
                          style="
                            vertical-align: top;
                            text-align: center;
                            padding: 0;
                          "
                          align="center"
                        >
                          <td
                            align="center"
                            style="
                              word-break: break-word;
                              border-collapse: collapse !important;
                              vertical-align: top;
                              text-align: center;
                              color: #333333;
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              font-weight: normal;
                              line-height: 20px;
                              font-size: 14px;
                              margin: 0;
                              padding: 0;
                            "
                            valign="top"
                          >
                            <center style="width: 100%; min-width: 580px">
                              <table
                                style="
                                  border-spacing: 0;
                                  border-collapse: collapse;
                                  vertical-align: top;
                                  text-align: inherit;
                                  width: 580px;
                                  margin: 0 auto;
                                  padding: 0;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      vertical-align: top;
                                      text-align: center;
                                      padding: 0;
                                    "
                                    align="center"
                                  >
                                    <td
                                      style="
                                        word-break: break-word;
                                        border-collapse: collapse !important;
                                        vertical-align: top;
                                        text-align: center;
                                        color: #333333;
                                        font-family: 'Helvetica Neue', Helvetica,
                                          Arial, sans-serif;
                                        font-weight: normal;
                                        line-height: 20px;
                                        font-size: 14px;
                                        margin: 0;
                                        padding: 0 0px 0 0;
                                      "
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        style="
                                          border-spacing: 0;
                                          border-collapse: collapse;
                                          vertical-align: top;
                                          text-align: center;
                                          width: 540px;
                                          margin: 0 auto;
                                          padding: 0;
                                        "
                                      >
                                        <tbody>
                                          <tr
                                            style="
                                              vertical-align: top;
                                              text-align: center;
                                              padding: 0;
                                            "
                                            align="center"
                                          >
                                            <td
                                              style="
                                                word-break: break-word;
                                                border-collapse: collapse !important;
                                                vertical-align: top;
                                                text-align: center;
                                                color: #333333;
                                                font-family: 'Helvetica Neue',
                                                  Helvetica, Arial, sans-serif;
                                                font-weight: normal;
                                                line-height: 20px;
                                                font-size: 14px;
                                                margin: 0;
                                                padding: 0px 0px 10px;
                                              "
                                              align="center"
                                              valign="top"
                                            >
                                              <div
                                                style="text-align: center"
                                                align="center"
                                              >
                                                <a
                                                  href="https://github.com"
                                                  style="
                                                    color: #4183c4;
                                                    text-decoration: none;
                                                  "
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://github.com&amp;source=gmail&amp;ust=1668748962395000&amp;usg=AOvVaw3d_PZ5bsGicNQFNZTrD5PK"
                                                >
                                                  <img
                                                    alt="GitHub home"
                                                    src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png"
                                                    width="80 "
                                                    height="80  "
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      width: auto;
                                                      max-width: 100%;
                                                      float: none;
                                                      text-align: center;
                                                      margin: 0 auto;
                                                      padding: 25px 0 17px;
                                                      border: none;
                                                    "
                                                    align="none"
                                                    class="CToWUd"
                                                    data-bit="iit"
                                                  />
                                                </a>
                                              </div>
                                            </td>
                                            <td
                                              style="
                                                word-break: break-word;
                                                border-collapse: collapse !important;
                                                vertical-align: top;
                                                text-align: center;
                                                width: 0px;
                                                color: #333333;
                                                font-family: 'Helvetica Neue',
                                                  Helvetica, Arial, sans-serif;
                                                font-weight: normal;
                                                line-height: 20px;
                                                font-size: 14px;
                                                margin: 0;
                                                padding: 0;
                                              "
                                              align="center"
                                              valign="top"
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </td>
                        </tr>
                      </tbody>
                    </table>
    
                    <table
                      style="
                        border-spacing: 0;
                        border-collapse: collapse;
                        vertical-align: top;
                        text-align: inherit;
                        width: 580px;
                        margin: 0 auto;
                        padding: 0;
                      "
                    >
                      <tbody>
                        <tr
                          style="
                            vertical-align: top;
                            text-align: center;
                            padding: 0;
                          "
                          align="center"
                        >
                          <td
                            style="
                              word-break: break-word;
                              border-collapse: collapse !important;
                              vertical-align: top;
                              text-align: center;
                              color: #333333;
                              font-family: 'Helvetica Neue', Helvetica, Arial,
                                sans-serif;
                              font-weight: normal;
                              line-height: 20px;
                              font-size: 14px;
                              margin: 0;
                              padding: 0;
                            "
                            align="center"
                            valign="top"
                          >
                            <table
                              style="
                                border-spacing: 0;
                                border-collapse: collapse;
                                vertical-align: top;
                                text-align: center;
                                width: 100%;
                                display: block;
                                padding: 0px;
                              "
                            >
                              <tbody>
                                <tr
                                  style="
                                    vertical-align: top;
                                    text-align: center;
                                    padding: 0;
                                  "
                                  align="center"
                                >
                                  <td
                                    style="
                                      word-break: break-word;
                                      border-collapse: collapse !important;
                                      vertical-align: top;
                                      text-align: center;
                                      color: #333333;
                                      font-family: 'Helvetica Neue', Helvetica,
                                        Arial, sans-serif;
                                      font-weight: normal;
                                      line-height: 20px;
                                      font-size: 14px;
                                      margin: 0;
                                      padding: 0 0px 0 0;
                                    "
                                    align="center"
                                    valign="top"
                                  >
                                    <div
                                      style="
                                        background: #ffffff;
                                        background-color: #ffffff;
                                        border-radius: 3px;
                                        padding: 20px;
                                        border: 1px solid #dddddd;
                                      "
                                    >
                                      <table
                                        style="
                                          border-spacing: 0;
                                          border-collapse: collapse;
                                          vertical-align: top;
                                          text-align: center;
                                          width: 540px;
                                          margin: 0 auto;
                                          padding: 0;
                                        "
                                      >
                                        <tbody>
                                          <tr
                                            style="
                                              vertical-align: top;
                                              text-align: center;
                                              padding: 0;
                                            "
                                            align="center"
                                          >
                                            <td
                                              style="
                                                word-break: break-word;
                                                border-collapse: collapse !important;
                                                vertical-align: top;
                                                text-align: center;
                                                color: #333333;
                                                font-family: 'Helvetica Neue',
                                                  Helvetica, Arial, sans-serif;
                                                font-weight: normal;
                                                line-height: 20px;
                                                font-size: 14px;
                                                margin: 0;
                                                padding: 0px 0px 0;
                                              "
                                              align="center"
                                              valign="top"
                                            >
                                              <div>
                                                <h1
                                                  style="
                                                    color: #333;
                                                    font-family: 'Helvetica Neue',
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 300;
                                                    text-align: center;
                                                    line-height: 1.2;
                                                    word-break: normal;
                                                    font-size: 24px;
                                                    margin: 10px 0 25px;
                                                    padding: 0;
                                                  "
                                                  align="center"
                                                >
                                                  ${inviter} has invited you to join
                                                  on the<br /><strong
                                                    >${groupName}</strong
                                                  >
                                                  group.
                                                </h1>
    
                                                <hr
                                                  style="
                                                    color: #d9d9d9;
                                                    background-color: #d9d9d9;
                                                    height: 1px;
                                                    margin: 20px 0;
                                                    border: none;
                                                  "
                                                />
    
                                                <p
                                                  style="
                                                    word-wrap: normal;
                                                    font-family: 'Helvetica Neue',
                                                      Helvetica, Arial, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    color: #333;
                                                    line-height: 20px;
                                                    text-align: left;
                                                    margin: 15px 0 5px;
                                                    padding: 0;
                                                  "
                                                  align="left"
                                                >
                                                  You can
                                                  <a
                                                    href="${invitarionUrl}"
                                                    style="
                                                      color: #4183c4;
                                                      text-decoration: none;
                                                    "
                                                    target="_blank"
                                                    >accept or decline</a
                                                  >
                                                  this invitation.
                                                </p>
    
                                                <p
                                                  style="
                                                    word-wrap: normal;
                                                    font-family: 'Helvetica Neue',
                                                      Helvetica, Arial, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    color: #333;
                                                    line-height: 20px;
                                                    text-align: left;
                                                    margin: 15px 0 5px;
                                                    padding: 0;
                                                  "
                                                  align="left"
                                                >
                                                  This invitation will expire in 7
                                                  days.
                                                </p>
    
                                                <div
                                                  style="
                                                    text-align: center;
                                                    color: #ffffff;
                                                    padding: 20px 0 25px;
                                                  "
                                                  align="center"
                                                >
                                                  <a
                                                    href="${invitarionUrl}"
                                                    style="
                                                      display: inline-block;
                                                      color: #fff;
                                                      font-size: 14px;
                                                      font-weight: 600;
                                                      background-color: #4183c4;
                                                      text-decoration: none;
                                                      width: auto !important;
                                                      text-align: center;
                                                      border-radius: 5px;
                                                      letter-spacing: normal;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial, sans-serif;
                                                      margin: 0 auto;
                                                      padding: 6px 12px;
                                                    "
                                                    target="_blank"
                                                    >View invitation</a
                                                  >
                                                </div>
                                                <hr
                                                  style="
                                                    color: #d9d9d9;
                                                    background-color: #d9d9d9;
                                                    height: 1px;
                                                    margin: 20px 0;
                                                    border: none;
                                                  "
                                                />
    
                                                <p
                                                  style="
                                                    word-wrap: normal;
                                                    font-family: 'Helvetica Neue',
                                                      Helvetica, Arial, sans-serif;
                                                    font-size: 12px;
                                                    font-weight: normal;
                                                    color: #777777;
                                                    line-height: 20px;
                                                    text-align: left;
                                                    margin: 15px 0 5px;
                                                    padding: 0;
                                                  "
                                                  align="left"
                                                >
                                                  <strong
                                                    >Getting a 404 error?</strong
                                                  >
                                                  Make sure you???re signed in.
                                                </p>
    
                                                <p
                                                  style="
                                                    word-wrap: normal;
                                                    font-family: 'Helvetica Neue',
                                                      Helvetica, Arial, sans-serif;
                                                    font-size: 12px;
                                                    font-weight: normal;
                                                    color: #777777;
                                                    line-height: 20px;
                                                    text-align: left;
                                                    margin: 15px 0 5px;
                                                    padding: 0;
                                                  "
                                                  align="left"
                                                >
                                                  <strong
                                                    >Button not working?</strong
                                                  >
                                                  Copy and paste this link into your
                                                  browser: <br /><a
                                                    href="${invitarionUrl}"
                                                    style="
                                                      color: #4183c4;
                                                      text-decoration: none;
                                                    "
                                                    target="_blank"
                                                    >${invitarionUrl}</a
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                            <td
                                              style="
                                                word-break: break-word;
                                                border-collapse: collapse !important;
                                                vertical-align: top;
                                                text-align: center;
                                                width: 0px;
                                                color: #333333;
                                                font-family: 'Helvetica Neue',
                                                  Helvetica, Arial, sans-serif;
                                                font-weight: normal;
                                                line-height: 20px;
                                                font-size: 14px;
                                                margin: 0;
                                                padding: 0;
                                              "
                                              align="center"
                                              valign="top"
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="yj6qo"></div>
          <div class="adL"></div>
        </div>
      </body>
    </html>
    `;
  },
};
