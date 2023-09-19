
/**
 * Toggle the theme between light and dark mode.
 * 
 * @param {Boolean} nested Is source page nested in the pages folder?
 */
function toggleTheme(nested=false) {
  var theme = document.getElementById('theme');
  var themePath = String(theme.getAttribute('href'));
  var pathToTheme = '';
  // themePath is the current theme being used
  // pathToTheme is the path to the new theme

  if (nested) {
    pathToTheme = '../';
    themePath = themePath.replace('../', '');
  }

  if (themePath == 'css/light.css') {
    sessionStorage.setItem("theme", 'css/dark.css');
    pathToTheme += 'css/dark.css';
  } else {
    pathToTheme += 'css/light.css';
    sessionStorage.setItem("theme", 'css/light.css');
  }
  console.log(pathToTheme);
  theme.setAttribute('href', pathToTheme);
};

/**
 * Retrieve user's theme preference
 * 
 * @param {Boolean} nested Is source page nested in the pages folder?
 */
function getThemePreference(nested=false) {

  const preference = sessionStorage.getItem("theme");
  const theme = document.getElementById('theme');
  var pathToTheme = '';
  
  if (preference) {
    if (nested) {
      pathToTheme = '../';
    }
    pathToTheme += preference;
    theme.setAttribute('href', pathToTheme);
  }
};

/**
 * Get parameter from URL.
 * 
 * @param {String} sParam Search Parameter
 * @returns 
 */
function getURLParam(sParam) {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
};