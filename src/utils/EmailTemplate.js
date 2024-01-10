export const getEmailTemplate = (post) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email with Responsive design</title>
        <style type="text/css">
          hr {
            border-color: rgba(255, 255, 255, 0.3) !important;
          }
    
          * {
            margin: 0;
            padding: 0;
          }
          table {
            border-spacing: 0;
          }
          td {
            padding: 0;
          }
          img {
            padding: 0;
          }
          .wrapper {
            width: 100%;
            table-layout: fixed;
            background: #f6f8fc;
          }
          .main {
            margin: 0 auto;
            width: 100%;
            background: #0f172a;
            max-width: 600px;
            font-family: sans-serif;
            color: #ddd;
            padding-bottom: 30px;
          }
          .two-columns {
            padding: 0 20px;
            text-align: center;
          }
          .two-columns .column {
            text-align: center;
            max-width: 277px;
            display: inline-block;
            vertical-align: top;
          }
          .hero_content {
            padding: 30px 20px 30px;
            text-align: center;
          }
          .post_detail_table {
            padding: 0 20px;
          }
          .two-columns_popular {
            width: 100%;
            vertical-align: middle;
          }
          .two-columns_popular .column_popular {
            padding-top: 20px;
            display: inline-block;
            text-align: center;
          }
          .two-columns_popular .column_popular:nth-child(1) {
            width: 350px;
            max-width: 100%;
            display: inline-block;
            vertical-align: top;
          }
          .two-columns_popular .column_popular:nth-child(2) {
            width: 180px;
            vertical-align: top;
            max-width: 100%;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <center class="wrapper">
          <table class="main" width="100%">
            <!-- Top Border -->
    
            <tr>
              <td height="5" style="background-color: #0c66ff"></td>
            </tr>
    
            <!-- Logo Section -->
            <tr>
              <td bgcolor="#0f172a" style="padding: 20px 0">
                <table width="100%">
                  <tr>
                    <td class="two-columns">
                      <table class="column" align="left">
                        <tr>
                          <td>
                            <table>
                              <tr style="display: inline-block">
                                <td>
                                  <a
                                    target="_blank"
                                    href="https://dev-blog-a-nextjs-app.vercel.app"
                                  >
                                    <p
                                      style="
                                        background: linear-gradient(
                                          0deg,
                                          #3359fa 0%,
                                          #66c6db 100%
                                        );
                                        background-clip: text;
                                        display: inline-block;
                                        font-size: 32px;
                                        font-weight: 600;
                                        -webkit-text-fill-color: transparent;
                                        color: transparent;
                                      "
                                    >
                                      Dev_Blog
                                    </p>
                                  </a>
                                </td>
                              </tr>
                              <tr style="display: inline-block">
                                <td>
                                  <a
                                    target="_blank"
                                    href="https://dev-blog-a-nextjs-app.vercel.app"
                                  >
                                    <img
                                      src="https://iconape.com/wp-content/png_logo_vector/google-web-dev-logo.png"
                                      alt="Dev_Blog_Logo"
                                      width="30"
                                      style="
                                        max-width: 30px;
                                        padding: 0px 0 0px 8px;
                                      "
                                    />
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table class="column" align="right">
                        <tr>
                          <td style="padding: 10px 0 0">
                            <a
                              target="_blank"
                              href="https://dev-blog-a-nextjs-app.vercel.app/"
                              style="font-size: 11px; color: #778899"
                              ;text-decoration:
                              underline;
                              >View in browser</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <!-- Hr -->
            <tr>
              <td style="padding: 0 20px"><hr /></td>
            </tr>
    
            <!-- Hero Section -->
    
            <tr>
              <td>
                <table width="100%" style="width: 100%; background: #0f172a">
                  <tr>
                    <td class="hero_content">
                      <h2 style="padding-bottom: 12px">Dev_Blog</h2>
                      <p
                        style="
                          font-size: 23px;
                          color: #b9b9b9;
                          padding-bottom: 30px;
                          line-height: 35px;
                        "
                      >
                        One stop platform to post their stories&nbsp;for
                        D_E_V_E_L_O_P_E_R_S
                      </p>
                      <a
                        target="_blank"
                        href="https://dev-blog-a-nextjs-app.vercel.app/"
                        style="
                          text-decoration: none;
                          background: #0c66ff;
                          color: #fff;
                          padding: 7px 30px;
                          border-radius: 3px;
                          border: none;
                          font-size: 15px;
                        "
                      >
                        Read all posts
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <!-- Post Detail Section  -->
    
            <tr>
              <td width="100%" style="width: 100%">
                <table width="100%" class="post_detail_table">
                  <tr>
                    <td style="width: 100%; padding: 20px 0">
                      <table style="width: 100%">
                        <tr style="display: inline-block; font-size: 20px">
                          <td>
                            <b>New Story from:</b>
                          </td>
                        </tr>
                        <tr style="display: inline-block; padding: 0 5px 0 10px">
                          <td>
                            <a target="_blank" href="#">
                              <img
                                style="border-radius: 50%"
                                width="25"
                                src=${post.user.image}
                                alt=""
                              />
                            </a>
                          </td>
                        </tr>
                        <tr style="display: inline-block">
                          <td>
                            <a target="_blank" style="color: #ddd" href="#"
                              >${post.user.name}</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 3px 0 0">
                            <a
                              href="#"
                              style="
                                padding: 10px 0 0;
                                color: #3359fa;
                                letter-spacing: 0.04rem;
                                font-size: 11px;
                              "
                              >@${post.user.email}</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://dev-blog-a-nextjs-app.vercel.app/posts/${
                          post.slug
                        }"
                        ><img
                          style="width: 100%; object-fit: cover; max-height: 260px"
                          src=${post.img}
                          alt=""
                      /></a>
                    </td>
                  </tr>
                  <tr>
                    <td class="post_content">
                      <a
                        style="color: #ddd; text-decoration: none"
                        href="https://dev-blog-a-nextjs-app.vercel.app/posts/${
                          post.slug
                        }"
                      >
                        <h2 style="padding: 30px 0 20px">
                         ${post.title}
                        </h2>
                        <div
                          style="
                            padding: 0 0 25px;
                            line-height: 25px;
                            font-size: 15px;
                          "
                        >
                          ${
                            post.desc.length > 190
                              ? post.desc.substring(0, 190) + "..."
                              : post.desc
                          }
                        </div>
                      </a>
                      <a
                        href="https://dev-blog-a-nextjs-app.vercel.app/posts/${
                          post.slug
                        }"
                        style="
                          padding: 7px 20px;
                          text-decoration: none;
                          width: fit-content;
                          cursor: pointer;
                          border: none;
                          font-size: 1rem;
                          border-radius: 0.3rem;
                          transition: 0.3s all;
                          z-index: 1;
                          overflow: hidden;
                          position: relative;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          background: var(--bg);
                          gap: 5px;
                          background: linear-gradient(
                            45deg,
                            #3023ae 0%,
                            #ff0099 100%
                          );
                          color: #fff;
                          font-size: 15px;
                        "
                      >
                        Read more..
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <!-- Most Polular Section -->
    
            <!-- Hr -->
            <tr>
              <td style="padding: 30px 20px 0"><hr /></td>
            </tr>
    
            <!-- Footer Section -->
    
            <tr>
              <td width="100%">
                <table
                  class="footer"
                  style="padding: 30px 20px 0px"
                  width="100%"
                  align="center"
                >
                  <tr>
                    <td style="text-align: center; width: 100%">
                      <p
                        style="
                          margin-block: 0.5rem;
                          font-size: 0.8rem;
                          letter-spacing: 0.05rem;
                          line-height: 20px;
                          color: lightslategray;
                        "
                      >
                        You will continue to receive <br />Notifications/Emails
                        whenever ${post.user.name} uploads a new post!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding-top: 10px">
                      <img
                        width="60"
                        style="max-width: 60px; border-radius: 50%"
                        src="https://lh3.googleusercontent.com/a/ACg8ocIOPt3vWC4DWTZDy8ZYx6EI-zLUNeN_aDrbQ34aRXEuon4=s96-c"
                        alt=""
                      />
                      <h2 style="padding-top: 10px">${post.user.name}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 100%; text-align: center; padding-top: 20px">
                      <a
                        href="https://dev-blog-a-nextjs-app.vercel.app/"
                        style="
                          color: #d6d6d6;
                          text-decoration: underline;
                          font-size: 12px;
                        "
                        >Visit Page</a
                      >
                      <a
                        href="https://dev-blog-a-nextjs-app.vercel.app/"
                        style="
                          color: #dedede;
                          padding-left: 10px;
                          text-decoration: underline;
                          font-size: 12px;
                        "
                        >Unsubscribe</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>
    `;
};
