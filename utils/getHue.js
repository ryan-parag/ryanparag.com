function getHue(color) {
  var r = parseInt(color.substring(0,2),16)/255;
  var g = parseInt(color.substring(2,4),16)/255;
  var b = parseInt(color.substring(4,6),16)/255;

  var hue;
  if ((r >= g) && (g >= b)) {
      hue = 60*(g-b)/(r-b);
  } else if ((g > r) && (r >= b)) {
      hue = 60*(2 - (r-b)/(g-b));
  }
  //... continue here
  return hue;
}

export function hexToHsl(color){
  var r = parseInt(color.substr(1,2), 16);
  var g = parseInt(color.substr(3,2), 16);
  var b = parseInt(color.substr(5,2), 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h, s, l];
}