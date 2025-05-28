export function getPrettyDate(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export function generateLazyURL(
  title: string,
  favIconURL: string,
  url: string,
  goToURLText: string
) {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/x-icon" href="${favIconURL}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            background-color: #181818;
            color: #ffffff;
            font-family: "Libre Franklin", sans-serif;
            display: flex;
            margin: 20px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            height: 100vh;
          }
          #copyButton {
            cursor: pointer;
            background-color: #2c2c2c;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            color: #ffffff;
            font-family: "Libre Franklin", sans-serif;
            font-size: 14px;
            transition: background-color 0.125s ease, color 0.125s ease;
          }
          #copyButton:hover {
            background-color: #77dd77;
            color: black;
          }
          h1, h2, p {
            margin: 10px 3px;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          p {
            font-size: 0.9rem;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        <a href="${url}"><p>${url}</p></a>
        <a href="${url}"><button id="copyButton">${goToURLText}</button></a>
      </body>
    </html>
  `;

  const base64Html = btoa(html);
  return `data:text/html;base64,${base64Html}`;
}
