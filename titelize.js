import title from 'title';
import fs from 'fs';
import readlineSync from 'readline-sync';
//const { prompt } = ps;

// @text is the text read from the file.
// @key is the key to find its value
function getValueByKey(text, key) {
  var regex = new RegExp("^\\t" + key + "\\s=\\s\\{(.*)\\},$", "gim");
  var match;
  while (match = regex.exec(text)) {
    var oldTitle = match[1];
    if (oldTitle.substr(oldTitle.length - 4) === 'TODO') {
      continue;
    }

    var newTitle = title(oldTitle);
    if (oldTitle == newTitle) {
      continue;
    }

    console.log('old: ' + oldTitle);
    console.log('new: ' + newTitle);
    const yn = readlineSync.question('Convert? (y(es)/n(o)/e(xit)/t(odo + y), nothing=y) \n');
    if (yn == 'y' || yn == '') {
      text = text.replace(oldTitle, newTitle);
      console.log("okay!");
    } else if (yn == 'e') {
      return text;
    } else if (yn == 't') {
      text = text.replace(oldTitle, newTitle + "TODO");
      console.log("todo added!");
    } else if (yn == 'tn') {
      text = text.replace(oldTitle, oldTitle + "TODO");
      console.log("todo added! (old title)");
    }
    else {
      console.log("skipped!");
    }
  }
  return text;
}

// ------- main -------
console.log(title('tHe cHicaGo maNual oF StyLe'));
const bib = fs.readFileSync('/Users/caro/Documents/Papers/bibliographies/TestAmplification.bib', 'utf8');

const text = getValueByKey(bib, 'title');

fs.writeFile('/Users/caro/Documents/Papers/bibliographies/TestAmplification.bib', text, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
});
