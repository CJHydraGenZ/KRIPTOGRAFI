const pt = document.querySelector("#plantext");
const keyd = document.querySelector("#key");
const display = document.querySelector(".text");
const display2 = document.querySelector(".text2");
const button = document.querySelector(".btn-vc");
const dec = document.querySelector(".dec");
const inpdec = document.querySelector("#decript");
const btn_dec = document.querySelector(".btn-dec");
const display3 = document.querySelector(".dec .text3");
const strdec = document.querySelector(".stringdec");

function doCryptCC(isDecrypt) {
  var shiftText = document.querySelector("#keycc").value;
  if (!/^-?\d+$/.test(shiftText)) {
    alert("Shift is not an integer");
    return;
  }
  var shift = parseInt(shiftText, 10);
  if (shift < 0 || shift >= 26) {
    alert("Shift is out of range");
    return;
  }
  if (isDecrypt) shift = (26 - shift) % 26;
  var textElem = document.querySelector("#cc");
  textElem.value = caesarShift(textElem.value, shift);
}

function caesarShift(text, shift) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (65 <= c && c <= 90)
      result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
    // Uppercase
    else if (97 <= c && c <= 122)
      result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    // Lowercase
    else result += text.charAt(i); // Copy
  }
  return result;
}

function doCrypt(isDecrypt) {
  if (document.getElementById("vercc").value.length == 0) {
    alert("Key is empty");
    return;
  }
  var key = filterKey(document.getElementById("vercc").value);
  if (key.length == 0) {
    alert("Key has no letters");
    return;
  }
  if (isDecrypt) {
    for (var i = 0; i < key.length; i++) key[i] = (26 - key[i]) % 26;
  }
  var textElem = document.getElementById("verc");
  textElem.value = crypt(textElem.value, key);
}

function crypt(input, key) {
  var output = "";
  for (var i = 0, j = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);
    if (isUppercase(c)) {
      output += String.fromCharCode(((c - 65 + key[j % key.length]) % 26) + 65);
      j++;
    } else if (isLowercase(c)) {
      output += String.fromCharCode(((c - 97 + key[j % key.length]) % 26) + 97);
      j++;
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}

function filterKey(key) {
  var result = [];
  for (var i = 0; i < key.length; i++) {
    var c = key.charCodeAt(i);
    if (isLetter(c)) result.push((c - 65) % 32);
  }
  return result;
}

// Tests whether the specified character code is a letter.
function isLetter(c) {
  return isUppercase(c) || isLowercase(c);
}

// Tests whether the specified character code is an uppercase letter.
function isUppercase(c) {
  return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
}

//! vernam chipter
button.addEventListener("click", () => {
  const plantext = pt.value.split("");
  const keys = keyd.value.split("");
  console.log(plantext);
  console.log(keys);
  if (plantext.length == keys.length) {
    display.textContent = Xor(loopStr(plantext), loopStr(keys));
    display2.textContent = VernamChipter(Xor(loopStr(plantext), loopStr(keys)));
    dec.style.visibility = "visible";

    btn_dec.addEventListener("click", () => {
      const inpdecs = inpdec.value.split("");
      if (inpdec.value == keyd.value) {
        display3.textContent = Xor(
          Xor(loopStr(plantext), loopStr(keys)),
          loopStr(inpdecs)
        );
        strdec.textContent = VernamChipter(
          Xor(Xor(loopStr(plantext), loopStr(keys)), loopStr(inpdecs))
        );
      } else {
        alert("key yang anda masukan tidak cocok");
      }
    });
  }
  if (plantext.length > keys.length) {
    display.textContent = Xor(
      loopStr(plantext),
      loopStr(looplen(plantext, keys))
    );
    display2.textContent = VernamChipter(
      Xor(loopStr(plantext), loopStr(looplen(plantext, keys)))
    );
    dec.style.visibility = "visible";
    btn_dec.addEventListener("click", () => {
      const inpdecs = inpdec.value.split("");
      if (inpdec.value == keyd.value) {
        display3.textContent = Xor(
          Xor(loopStr(plantext), loopStr(keys)),
          loopStr(inpdecs)
        );
        strdec.textContent = VernamChipter(
          Xor(Xor(loopStr(plantext), loopStr(keys)), loopStr(inpdecs))
        );
      } else {
        alert("key yang anda masukan tidak cocok");
      }
    });
  }
  if (plantext.length < keys.length) {
    display.textContent = Xor(loopStr(looplen(plantext, keys)), loopStr(keys));
    display2.textContent = VernamChipter(
      Xor(loopStr(looplen(plantext, keys)), loopStr(keys))
    );
    dec.style.visibility = "visible";
    btn_dec.addEventListener("click", () => {
      const inpdecs = inpdec.value.split("");
      if (inpdec.value == keyd.value) {
        display3.textContent = Xor(
          Xor(loopStr(plantext), loopStr(keys)),
          loopStr(inpdecs)
        );
        strdec.textContent = VernamChipter(
          Xor(Xor(loopStr(plantext), loopStr(keys)), loopStr(inpdecs))
        );
      } else {
        alert("key yang anda masukan tidak cocok");
      }
    });
  }
});

// btn_dec.addEventListener('click',()=>{

// })

//! string to array
// const text = "cahya";
// const m = text.split("");
// console.log(m);

// todo selesai untuk logika vernam chipter
const key = [
  "I",
  "G",
  "D",
  "",
  "C",
  "A",
  "H",
  "Y",
  "A",
  "",
  "A",
  "R",
  "I",
  "",
  "W",
  "I",
  "B",
  "A",
  "W",
  "A",
];
const str = ["1", "0"];
// console.log(key.length);

function loopStr(str) {
  const arr = str.map((a) => a.charCodeAt(0));
  return arr;
}

function Xor(p, k) {
  return p.map((x, i) => x ^ k[i]);
}

function VernamChipter(xor) {
  return xor.map((x) => String.fromCharCode(x));
}
// console.log();

// todo
function looplen(p, k) {
  const arr1 = [];

  if (p.length > k.length) {
    let a = 0;
    for (let i = 0; i < p.length; i++) {
      if (a == k.length) {
        a = 0;
      }
      arr1.push(k[a++]);
      // a++;
    }
  }

  if (p.length < k.length) {
    let b = 0;
    for (let i = 0; i < k.length; i++) {
      // console.log(p);
      if (b == p.length) {
        b = 0;
      }
      arr1.push(p[b++]);
    }
  }

  return arr1;
}
// looplen(str, key);

// console.log("log", Xor(loopStr(looplen(str, key)), loopStr(key)));
// console.log(
//   "log",
//   VernamChipter(Xor(loopStr(looplen(str, key)), loopStr(key)))
// );

function destobin(arrdes) {
  if (arrdes < 0) {
    arrdes = 0xffffffff + arrdes + 1;
  }
  if (!Array.isArray(arrdes)) {
    return parseInt(arrdes, 10).toString(2);
  } else {
    return arrdes.map((x) => parseInt(x, 10).toString(2));
  }
}

// ! solved
// const p = "C";
// const k = "0";
// const plan = p.charCodeAt(0);
// const keys = k.charCodeAt(0);
// const xor = plan ^ keys;
// // console.log("xor func", Xor(plan, keys));

// // ? contoh latihan
// console.log("contoh", destobin(plan));
// console.log("contoh", destobin(keys));
// console.log("contoh xor", destobin(plan) ^ destobin(keys));
// const xor2 = destobin(plan) ^ destobin(keys);
// console.log("contoh1 xor bin", parseInt(xor2, 2));
// const dec = String.fromCharCode(xor);
// console.log(keys);
// console.log("des xor", xor);
// console.log(dec);

// console.log(looplen(str, key));
// console.log(loopStr(str));
// console.log(loopStr(looplen(str, key)));
// const decript = Xor(loopStr(str), loopStr(looplen(str, key)));
// console.log("xor arry", loopStr(str) ^ loopStr(looplen(str, key)));
// console.log("xor func", Xor(loopStr(str), loopStr(looplen(str, key))));
// console.log("VernamChipter func", VernamChipter(decript));
// console.log("xor func", Xor(decript, loopStr(looplen(str, key))));
// const dxor = Xor(decript, loopStr(looplen(str, key)));
// console.log(VernamChipter(dxor));

// console.log("uts", Xor(loopStr(key), loopStr(str)));
// const uts = Xor(loopStr(str), loopStr(key));
// console.log(loopStr(str));
// console.log(loopStr(key));

// console.log("uts", VernamChipter(uts));
// console.log("uts", VernamChipter(key));

//! latihan xor //! latihan xor console.log()
// const buffer = new SharedArrayBuffer(loopStr(str));

// 7 (0111) XOR 2 (0010) = 5 (0101)
// console.log(Atomics.xor(uint8, 0, 2));

// console.log(destobin(loopStr(str)));

// var n = str.charCodeAt(0);

// function destoBHO(n, base) {
//   if (n < 0) {
//     n = 0xffffffff + n + 1;
//   }
//   switch (base) {
//     case "B":
//       return parseInt(n, 10).toString(2);
//       break;
//     case "H":
//       return parseInt(n, 10).toString(16);
//       break;
//     case "O":
//       return parseInt(n, 10).toString(8);
//       break;
//     default:
//       return "Wrong input.........";
//   }
// }

// console.log("des", n);
// console.log(destoBHO(n, "B"));


