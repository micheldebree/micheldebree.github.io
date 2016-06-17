function ImageGrabber(a,b){"use strict";function c(){var c,d,f,g,h=document.createElement("canvas"),i=h.getContext("2d");h.width=b.width*b.pWidth,h.height=b.height*b.pHeight;var j=h.width/h.height,k=a.width/a.height;f=k>j?a.height*j:a.width,g=k>j?a.height:a.width/j,c=(a.width-f)/2,d=(a.height-g)/2,i.drawImage(a,c,d,f,g,0,0,b.width,b.height),e(i.getImageData(0,0,b.width,b.height))}function d(b){if(e=b,a.complete)c();else{var d=a.onload;"function"!=typeof d?a.onload=c:a.onload=function(){d(),c()}}}var e;return{grab:d}}function Palette(a){"use strict";this.pixels=void 0===a?[]:a}function ColorMap(a,b,c,d){"use strict";this.colors=[],this.width=a,this.height=b,this.resX=void 0!==c?c:a,this.resY=void 0!==d?d:b}function Remapper(a){"use strict";this.targetPixelImage=a}function PixelImage(){"use strict";this.height=void 0,this.width=void 0,this.pWidth=1,this.pHeight=1,this.colorMaps=[],this.palette=void 0,this.pixelIndex=[],this.ditherOffset=[],this.dither=[[0]],this.errorDiffusionDither=function(){},this.mappingWeight=[1,1,1]}function BinaryFile(){"use strict"}function KoalaPicture(){"use strict";this.loadAddress=new Uint8Array(2),this.loadAddress[0]=0,this.loadAddress[1]=96,this.bitmap=new Uint8Array(8e3),this.screenRam=new Uint8Array(1e3),this.colorRam=new Uint8Array(1e3),this.background=new Uint8Array(1)}angular.module("vicarApp",["ngRoute","ngFileUpload"]).config(["$routeProvider","$compileProvider",function(a,b){"use strict";a.when("/",{templateUrl:"views/main.html"}).when("/koala",{templateUrl:"views/koala.html",controller:"KoalaCtrl"}).when("/settings",{templateUrl:"views/settings.html"}).when("/debug",{templateUrl:"views/debug.html"}).otherwise({redirectTo:"/"}),b.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob|data):/)}]),angular.module("vicarApp").controller("MainCtrl",["$scope","c64izerService",function(a,b){"use strict";function c(a,b){var c=a.colorMaps[b],d=PixelImage.create(c.width,c.height,new ColorMap(c.width,c.height,1,1),1,1);return d.pWidth=a.pWidth,d.pHeight=a.pHeight,d.palette=a.palette,d.drawImageData(c.toImageData(d.palette)),d}function d(){var d=a.selectedGraphicMode.value(),f=new ImageGrabber(e,d);a.mainImage=void 0,d.dither=a.selectedDither.value,d.errorDiffusionDither=a.selectedErrorDiffusionDither.value,d.mappingWeight=a.selectedPsychedelicMode.value,f.grab(function(e){a.$evalAsync(function(){b.convertToPixelImage(e,d),a.mainImage=d,a.download=d.toDownloadUrl(),a.colorMap=[],a.colorMap[0]=c(d,0),a.colorMap[1]=c(d,1),a.colorMap[2]=c(d,2),a.colorMap[3]=c(d,3),"Multicolor"===a.selectedGraphicMode.key?a.koalaLink=KoalaPicture.fromPixelImage(d).toUrl():a.koalaLink=void 0})})}var e=new Image;e.src="images/eye.jpg",a.filename="eye",a.graphicModes=b.supportedGraphicModes,a.selectedGraphicMode=a.graphicModes[0],a.selectGraphicMode=function(b){a.selectedGraphicMode=b,d()},a.dithers=b.getSupportedDithers(),a.selectedDither=a.dithers[0],a.selectDither=function(b){a.selectedDither=b,d()},a.errorDiffusionDithers=b.supportedErrorDiffusionDithers,a.selectedErrorDiffusionDither=a.errorDiffusionDithers[3],a.selectErrorDiffusionDither=function(b){a.selectedErrorDiffusionDither=b,d()},a.psychedelicModes=b.supportedPsychedelicModes,a.selectedPsychedelicMode=a.psychedelicModes[0],a.selectPsychedelicMode=function(b){a.selectedPsychedelicMode=b,d()},a.upload=function(b){a.filename=b.name,e.src=URL.createObjectURL(b),e.onload=function(){a.$evalAsync(function(){d()})}},d()}]),angular.module("vicarApp").controller("KoalaCtrl",["$scope",function(a){"use strict";a.$watch("koalafile",function(){var b=new KoalaPicture,c=new FileReader;"undefined"!=typeof a.koalafile&&1===a.koalafile.length&&(c.onload=function(){var d=new KoalaPicture;d.read(c.result),a.koalaImage=b.toPixelImage(d,peptoPalette),a.koalaImage.setPixelIndex(0),a.$apply()},c.readAsArrayBuffer(a.koalafile[0]))})}]),angular.module("vicarApp").directive("pixelImage",function(){"use strict";function a(a,b){a.$watch(function(){return a.pixelImage},function(){void 0!==a.pixelImage?b.attr("src",a.pixelImage.toSrcUrl()):b.attr("src","images/screen.gif")})}return{scope:{pixelImage:"="},link:a}}),angular.module("vicarApp").factory("c64izerService",function(){"use strict";function a(a,b,c){return[a[0]*b/c,a[1]*b/c,a[2]*b/c]}function b(b,c,d,e){b.addDitherOffset(c+1,d,a(e,7,16)),b.addDitherOffset(c-1,d+1,a(e,3,16)),b.addDitherOffset(c,d+1,a(e,5,16)),b.addDitherOffset(c+1,d+1,a(e,1,16))}function c(b,c,d,e){b.addDitherOffset(c+1,d,a(e,7,48)),b.addDitherOffset(c+2,d,a(e,5,48)),b.addDitherOffset(c-2,d+1,a(e,3,48)),b.addDitherOffset(c-1,d+1,a(e,5,48)),b.addDitherOffset(c,d+1,a(e,7,48)),b.addDitherOffset(c+1,d+1,a(e,5,48)),b.addDitherOffset(c+2,d+1,a(e,3,48)),b.addDitherOffset(c-2,d+2,a(e,1,48)),b.addDitherOffset(c-1,d+2,a(e,3,48)),b.addDitherOffset(c,d+2,a(e,5,48)),b.addDitherOffset(c+1,d+2,a(e,3,48)),b.addDitherOffset(c+2,d+2,a(e,1,48))}function d(b,c,d,e){b.addDitherOffset(c+1,d,a(e,1,8)),b.addDitherOffset(c+2,d,a(e,1,8)),b.addDitherOffset(c-1,d+1,a(e,1,8)),b.addDitherOffset(c,d+1,a(e,1,8)),b.addDitherOffset(c+1,d+1,a(e,1,8)),b.addDitherOffset(c,d+2,a(e,1,8))}function e(a,b){return new Remapper(b).mapImageData(a)}return{convertToPixelImage:e,supportedGraphicModes:[{key:"Multicolor",value:function(){var a=PixelImage.create(160,200,void 0,2,1);return a.palette=peptoPalette,a.colorMaps.push(new ColorMap(160,200)),a.colorMaps.push(new ColorMap(160,200,4,8)),a.colorMaps.push(new ColorMap(160,200,4,8)),a.colorMaps.push(new ColorMap(160,200,4,8)),a}},{key:"FLI",value:function(){var a=PixelImage.create(160,200,void 0,2,1);return a.palette=peptoPalette,a.colorMaps.push(new ColorMap(160,200)),a.colorMaps.push(new ColorMap(160,200,4,8)),a.colorMaps.push(new ColorMap(160,200,4,1)),a.colorMaps.push(new ColorMap(160,200,4,1)),a}},{key:"AFLI",value:function(){var a=PixelImage.create(320,200,void 0,1,1);return a.palette=peptoPalette,a.colorMaps.push(new ColorMap(320,200,8,8)),a.colorMaps.push(new ColorMap(320,200,8,1)),a}},{key:"Hires",value:function(){var a=PixelImage.create(320,200,void 0,1,1);return a.palette=peptoPalette,a.colorMaps.push(new ColorMap(320,200,8,8)),a.colorMaps.push(new ColorMap(320,200,8,8)),a}}],getSupportedDithers:function(){return[{key:"None",value:[[0]]},{key:"Bayer 2 x 2",value:[[1,3],[4,2]]},{key:"Bayer 4 x 4",value:[[1,9,3,11],[13,5,15,7],[4,12,2,10],[16,8,14,6]]},{key:"Bayer 8 x 8",value:[[1,49,13,61,4,52,16,64],[33,17,45,29,36,20,48,31],[9,57,5,53,12,60,8,56],[41,25,37,21,44,28,40,24],[3,51,15,63,2,50,14,62],[35,19,47,31,34,18,46,30],[11,59,7,55,10,58,6,54],[43,27,39,23,42,26,38,22]]}]},supportedErrorDiffusionDithers:[{key:"None",value:function(){}},{key:"Floyd-Steinberg",value:b},{key:"Jarvis, Judice and Ninke",value:c},{key:"Atkinson",value:d}],supportedPsychedelicModes:[{key:"None",value:[1,1,1]},{key:"Rainbow",value:[1,0,0]},{key:"Candy",value:[1,0,1]},{key:"Forest",value:[1,1,0]}]}}),Palette.prototype.get=function(a){"use strict";return this.pixels[a]},Palette.prototype.getDistance=function(a,b,c,d){"use strict";var e=this.pixels[b];return c=void 0!==c?c:PixelCalculator.emptyPixel,d=void 0!==d?d:[1,1,1],a=PixelCalculator.toYUV(a),e=PixelCalculator.toYUV(e),c=PixelCalculator.toYUV(c),Math.sqrt(d[0]*Math.pow(a[0]-e[0]-c[0],2)+d[1]*Math.pow(a[1]-e[1]-c[1],2)+d[2]*Math.pow(a[2]-e[2]-c[2],2))},Palette.prototype.mapPixel=function(a,b,c){"use strict";var d,e,f,g;for(d=0;d<this.pixels.length;d+=1)e=this.getDistance(a,d,b,c),(void 0===f||f>e)&&(f=e,g=d);return g};var peptoPalette=new Palette([[0,0,0,255],[255,255,255,255],[104,55,43,255],[112,164,178,255],[111,61,134,255],[88,141,67,255],[53,40,121,255],[184,199,111,255],[111,79,37,255],[67,57,0,255],[154,103,89,255],[68,68,68,255],[108,108,108,255],[154,210,132,255],[108,94,181,255],[149,149,149,255]]);ColorMap.prototype.isInRange=function(a,b){"use strict";return a>=0&&a<this.width&&b>=0&&b<this.height},ColorMap.prototype.mapX=function(a){"use strict";return Math.floor(a/this.resX)},ColorMap.prototype.mapY=function(a){"use strict";return Math.floor(a/this.resY)},ColorMap.prototype.add=function(a,b,c){"use strict";if(this.isInRange(a,b)){var d=this.mapX(a);void 0===this.colors[d]&&(this.colors[d]=[]),this.colors[d][this.mapY(b)]=c}},ColorMap.prototype.toImageData=function(a){"use strict";var b,c,d=document.createElement("canvas"),e=d.getContext("2d"),f=e.createImageData(this.width,this.height);for(c=0;c<this.height;c+=1)for(b=0;b<this.width;b+=1)PixelCalculator.poke(f,b,c,a.get(this.getColor(b,c)));return f},ColorMap.prototype.getColor=function(a,b){"use strict";var c=this.mapX(a),d=this.mapY(b);return void 0!==this.colors[c]?this.colors[c][d]:void 0},ColorMap.prototype.reduceToMax=function(a,b,c,d){"use strict";var e,f,g,h,i,j=[];for(e=a;a+c>e;e+=1)for(f=b;b+d>f;f+=1)g=this.getColor(e,f),void 0!==g&&(j[g]=void 0===j[g]?1:j[g]+1,(void 0===h||j[g]>h)&&(h=j[g],i=g));return i},ColorMap.prototype.subtract=function(a){"use strict";var b,c;for(b=0;b<this.width;b+=this.resX)for(c=0;c<this.height;c+=this.resY)this.getColor(b,c)===a.getColor(b,c)&&this.add(b,c,void 0)},ColorMap.prototype.extractColorMap=function(a){"use strict";var b,c,d=a.resX,e=a.resY;for(b=0;b<a.width;b+=d)for(c=0;c<a.height;c+=e)a.add(b,c,this.reduceToMax(b,c,d,e));this.subtract(a)},Remapper.prototype.getColorMap=function(a,b){"use strict";var c=a.width,d=a.height,e=PixelImage.create(c,d,new ColorMap(c,d,1,1),b.pWidth,b.pHeight);return e.palette=b.palette,e.dither=b.dither,e.mappingWeight=b.mappingWeight,e.errorDiffusionDither=b.errorDiffusionDither,e.drawImageData(a),e.colorMaps[0]},Remapper.prototype.mapImageData=function(a){"use strict";var b,c=this.getColorMap(a,this.targetPixelImage);for(b=0;b<this.targetPixelImage.colorMaps.length;b+=1)c.extractColorMap(this.targetPixelImage.colorMaps[b]);this.targetPixelImage.drawImageData(a)},PixelImage.create=function(a,b,c,d,e){"use strict";var f=new PixelImage;return f.pWidth=void 0===d?1:d,f.pHeight=void 0===e?1:e,f.height=b,f.width=a,void 0!==c&&f.colorMaps.push(c),f},PixelImage.prototype.assertValid=function(){"use strict";if(void 0===this.width||void 0===this.height)throw new Error("PixelImage has undefined dimensions.")},PixelImage.prototype.findColorInMap=function(a,b,c){"use strict";var d;for(d=0;d<this.colorMaps.length;d+=1)if(c===this.colorMaps[d].getColor(a,b))return d},PixelImage.prototype.map=function(a,b,c,d){"use strict";var e,f,g,h,i=0;for(e=0;e<this.colorMaps.length;e+=1)h=this.colorMaps[e].getColor(b,c),f=this.palette.getDistance(a,h,d,this.mappingWeight),(void 0===g||g>f)&&(g=f,i=e);return i},PixelImage.prototype.setPixelIndex=function(a,b,c){"use strict";void 0===this.pixelIndex[b]&&(this.pixelIndex[b]=[]),this.pixelIndex[b][a]=c},PixelImage.prototype.getPixelIndex=function(a,b){"use strict";var c=this.pixelIndex[b];return void 0!==c?c[a]:void 0},PixelImage.prototype.setDitherOffset=function(a,b,c){"use strict";a<this.width&&b<this.height&&(void 0===this.ditherOffset[b]&&(this.ditherOffset[b]=[]),this.ditherOffset[b][a]=c)},PixelImage.prototype.addDitherOffset=function(a,b,c){"use strict";var d=this.getDitherOffset(a,b);this.setDitherOffset(a,b,PixelCalculator.add(d,c))},PixelImage.prototype.getDitherOffset=function(a,b){"use strict";var c=this.ditherOffset[b];return void 0!==c&&void 0!==c[a]?c[a]:PixelCalculator.emptyPixel},PixelImage.prototype.orderedDither=function(a,b){"use strict";var c=this.dither[b%this.dither.length][a%this.dither.length];this.addDitherOffset(a+1,b,[c,c,c])},PixelImage.prototype.poke=function(a,b,c){"use strict";var d,e,f,g,h;g=this.getDitherOffset(a,b),d=this.palette.mapPixel(c,g,this.mappingWeight),e=this.palette.get(d),h=PixelCalculator.substract(e,c),this.orderedDither(a,b,c),this.errorDiffusionDither(this,a,b,h),f=this.findColorInMap(a,b,d),void 0===f&&(f=this.findColorInMap(a,b,void 0)),void 0!==f?this.colorMaps[f].add(a,b,d):void 0===f&&(f=this.map(c,a,b,g)),this.setPixelIndex(a,b,f)},PixelImage.prototype.drawImageData=function(a){"use strict";var b,c,d;for(c=0;c<this.height;c+=1)for(b=0;b<this.width;b+=1)d=PixelCalculator.peek(a,b,c),this.poke(b,c,d)},PixelImage.prototype.fromImageData=function(a){"use strict";this.init(a.width,a.height),this.colorMaps=[new ColorMap(this.width,this.height,1,1)],this.drawImageData(a)},PixelImage.prototype.getPaletteIndex=function(a,b){"use strict";var c=this.getPixelIndex(a,b);return void 0!==c?this.colorMaps[c].getColor(a,b):void 0},PixelImage.prototype.peek=function(a,b){"use strict";var c=this.getPaletteIndex(a,b);return void 0!==c?this.palette.get(c):PixelImage.emptyPixel},PixelImage.prototype.toSrcUrl=function(){"use strict";return this.assertValid(),this.toUrl("image/png")},PixelImage.prototype.toDownloadUrl=function(){"use strict";return this.toSrcUrl().replace("data:image/png","data:image/octet-stream")},PixelImage.prototype.toUrl=function(a){"use strict";var b,c,d,e,f,g,h,i,j=document.createElement("canvas"),k=j.getContext("2d");for(j.width=this.width*this.pWidth,j.height=this.height*this.pHeight,b=k.createImageData(j.width,j.height),c=0;c<this.width;c+=1)for(d=0;d<this.height;d+=1)for(i=this.peek(c,d),e=0;e<this.pWidth;e+=1)for(g=c*this.pWidth+e,h=d*this.pHeight,f=0;f<this.pHeight;f+=1)PixelCalculator.poke(b,g,h+f,i);return k.putImageData(b,0,0),j.toDataURL(a)},PixelImage.prototype.addColorMap=function(a){"use strict";this.colorMaps.push(a)},PixelImage.prototype.getTransparencyPercentage=function(){"use strict";var a,b,c=0;for(a=0;a<this.width;a+=1)for(b=0;b<this.height;b+=1)c+=void 0===this.getPixelIndex(a,b)?1:0;return Math.round(100*c/(this.width*this.height))};var PixelCalculator={};PixelCalculator.add=function(a,b){"use strict";return[a[0]+b[0],a[1]+b[1],a[2]+b[2],a[3]+b[3]]},PixelCalculator.substract=function(a,b){"use strict";return[a[0]-b[0],a[1]-b[1],a[2]-b[2],a[3]-b[3]]},PixelCalculator.multiply=function(a,b){"use strict";return[a[0]*b,a[1]*b,a[2]*b]},PixelCalculator.divide=function(a,b){"use strict";return[a[0]/b,a[1]/b,a[2]/b]},PixelCalculator.clone=function(a){"use strict";return[a[0],a[1],a[2],a[3]]},PixelCalculator.isEmpty=function(a){"use strict";return void 0===a[3]||a[3]<1},PixelCalculator.equals=function(a,b){"use strict";return!PixelCalculator.isEmpty(a)&&!PixelCalculator.isEmpty(b)&&a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]},PixelCalculator.emptyPixel=[0,0,0,0],PixelCalculator.getImageData=function(a,b,c){"use strict";var d=document.createElement("canvas"),e=d.getContext("2d");return d.width=b,d.height=c,e.drawImage(a,0,0,b,c),e.getImageData(0,0,b,c)},PixelCalculator.cloneImageData=function(a){"use strict";if(void 0!==a){var b=document.createElement("canvas"),c=b.getContext("2d");return b.width=a.width,b.height=a.height,c.putImageData(a,0,0),c.getImageData(0,0,b.width,b.height)}},PixelCalculator.coordsToindex=function(a,b,c){"use strict";var d=Math.floor(c)*(a.width<<2)+(b<<2);return d<a.data.length?d:void 0},PixelCalculator.poke=function(a,b,c,d){"use strict";if(void 0!==d){var e=PixelCalculator.coordsToindex(a,b,c);void 0!==e&&(a.data[e]=d[0],a.data[e+1]=d[1],a.data[e+2]=d[2],a.data[e+3]=d[3])}},PixelCalculator.peek=function(a,b,c){"use strict";var d=PixelCalculator.coordsToindex(a,b,c);return void 0!==d?[a.data[d],a.data[d+1],a.data[d+2],a.data[d+3]]:PixelCalculator.emptyPixel},PixelCalculator.resize=function(a,b,c){"use strict";var d=document.createElement("canvas"),e=d.getContext("2d");return d.width=b,d.height=c,e.putImageData(a,0,0,0,0,b,c),e.getImageData(0,0,b,c)},PixelCalculator.toYUV=function(a){"use strict";return[.299*a[0]+.587*a[1]+.114*a[2],a[0]*-.14713+a[1]*-.28886+.436*a[2],.615*a[0]+a[1]*-.51499+a[2]*-.10001]},PixelCalculator.toYCbCr=function(a){"use strict";return[.299*a[0]+.587*a[1]+.114*a[2],128-a[0]*-.168736-.331264*a[1]+.5*a[2],128+.5*a[0]-.418688*a[1]-.08131*a[2]]},BinaryFile.prototype.concat=function(a){"use strict";var b,c,d,e=0,f=0;for(b=0;b<a.length;b+=1)f+=a[b].length;for(d=new Uint8Array(f),b=0;b<a.length;b+=1)for(c=0;c<a[b].length;c+=1)d[e]=a[b][c],e+=1;return d},BinaryFile.prototype.toObjectUrl=function(a){"use strict";return URL.createObjectURL(new Blob([a],{type:"application/octet-binary"}))},KoalaPicture.prototype=new BinaryFile,KoalaPicture.prototype.constructor=BinaryFile,KoalaPicture.prototype.read=function(a){"use strict";this.loadAddress=new Uint8Array(a,0,2),this.bitmap=new Uint8Array(a,2,8e3),this.screenRam=new Uint8Array(a,8002,1e3),this.colorRam=new Uint8Array(a,9002,1e3),this.background=new Uint8Array(a,10002,1)},KoalaPicture.prototype.toBytes=function(){"use strict";return this.concat([this.loadAddress,this.bitmap,this.screenRam,this.colorRam,this.background])},KoalaPicture.prototype.toUrl=function(){"use strict";return this.toObjectUrl(this.toBytes())},KoalaPicture.convertBitmap=function(a){"use strict";var b,c,d,e=new Uint8Array(8e3),f=0;for(b=0;b<a.height;b+=8)for(c=0;c<a.width;c+=4)for(d=0;8>d;d+=1)e[f]=a.getPixelIndex(c,b+d)<<6|a.getPixelIndex(c+1,b+d)<<4|a.getPixelIndex(c+2,b+d)<<2|a.getPixelIndex(c+3,b+d),f+=1;return e},KoalaPicture.convertScreenram=function(a,b){"use strict";var c,d,e=0,f=new Uint8Array(1e3);for(d=0;d<a.height;d+=8)for(c=0;c<a.width;c+=4)f[e]=b.getColor(c,d)<<4&240|15&a.getColor(c,d),e+=1;return f},KoalaPicture.convertColorram=function(a){"use strict";var b,c,d=a.width,e=a.height,f=0,g=new Uint8Array(1e3);for(c=0;e>c;c+=8)for(b=0;d>b;b+=4)g[f]=15&a.getColor(b,c),f+=1;return g},KoalaPicture.fromPixelImage=function(a){"use strict";var b=new KoalaPicture;return b.bitmap=this.convertBitmap(a),b.screenRam=this.convertScreenram(a.colorMaps[2],a.colorMaps[1]),b.colorRam=this.convertColorram(a.colorMaps[3]),b.background[0]=a.colorMaps[0].getColor(0,0),b},KoalaPicture.toPixelImage=function(a,b){"use strict";var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=160,r=200,s=new PixelImage.create(q,r,void 0,2,1),t=0,u=0,v=4,w=8;for(s.palette=b,s.addColorMap(new ColorMap(q,r,q,r)),s.addColorMap(new ColorMap(q,r,v,w)),s.addColorMap(new ColorMap(q,r,v,w)),s.addColorMap(new ColorMap(q,r,v,w)),d=0;r>d;d+=w)for(c=0;q>c;c+=v)for(e=0;w>e;e+=1)f=a.bitmap[t]>>6&3,g=a.bitmap[t]>>4&3,h=a.bitmap[t]>>2&3,i=3&a.bitmap[t],o=c,p=d+e,s.setPixelIndex(o,p,f),s.setPixelIndex(o+1,p,g),s.setPixelIndex(o+2,p,h),s.setPixelIndex(o+3,p,i),t+=1;for(k=0;r>k;k+=w)for(j=0;q>j;j+=v)l=a.screenRam[u]>>4&15,m=15&a.screenRam[u],n=15&a.colorRam[u],s.colorMaps[1].add(j,k,l),s.colorMaps[2].add(j,k,m),s.colorMaps[3].add(j,k,n),u+=1;return s.colorMaps[0].add(0,0,a.background[0]),s};