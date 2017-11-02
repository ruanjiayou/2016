console.log("测试 js阻塞:js file log!");
var str = "";
;(function(){
    var BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
          || this.searchVersion(navigator.appVersion)
          || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
      },
      searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) != -1)
              return data[i].identity;
          }
          else if (dataProp)
            return data[i].identity;
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
      },
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        },
        {	 string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
        },
        {
          string: navigator.vendor,
          subString: "Apple",
          identity: "Safari",
          versionSearch: "Version"
        },
        {
          prop: window.opera,
          identity: "Opera"
        },
        {
          string: navigator.vendor,
          subString: "iCab",
          identity: "iCab"
        },
        {
          string: navigator.vendor,
          subString: "KDE",
          identity: "Konqueror"
        },
        {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
        },
        {
          string: navigator.vendor,
          subString: "Camino",
          identity: "Camino"
        },
        {		// for newer Netscapes (6+)
          string: navigator.userAgent,
          subString: "Netscape",
          identity: "Netscape"
        },
        {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Internet Explorer",
          versionSearch: "MSIE"
        },
        {
          string: navigator.userAgent,
          subString: "Gecko",
          identity: "Mozilla",
          versionSearch: "rv"
        },
        {		 // for older Netscapes (4-)
          string: navigator.userAgent,
          subString: "Mozilla",
          identity: "Netscape",
          versionSearch: "Mozilla"
        }
      ],
      dataOS : [
        {
          string: navigator.platform,
          subString: "Win",
          identity: "Windows"
        },
        {
          string: navigator.platform,
          subString: "Mac",
          identity: "Mac"
        },
        {
             string: navigator.userAgent,
             subString: "iPhone",
             identity: "iPhone/iPod"
        },
        {
          string: navigator.platform,
          subString: "Linux",
          identity: "Linux"
        }
      ]
    };
    BrowserDetect.init();
    window.BrowserDetect = BrowserDetect;
})();
function adapt(designWidth, rem2px) {
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
    str = "<p>默认字体大小：" + defaultFontSize + "</p>";
    str += "<p>设置的默认字体大小："+ (window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%') + "</p>";
    window.onload = function(){
    var dpr = window.devicePixelRatio || 1;
        str += "<p>设置后的1rem:"+getComputedStyle(document.getElementById("square"),false)["font-size"]+"</p>";
        str += "<p>dpr："+dpr+"</p>";
        str += "<p>device width:"+window.innerWidth+"px</p>";
        str += "<p>px width:" + dpr*window.innerWidth+"px</p>";
        str += "<p>designWidth:"+designWidth+"px</p>";
        str += "<p>designFontSize:"+rem2px+"px</p>";
        str += "<p>width radio:"+designWidth/window.innerWidth+"</p>";
        str += "<p>fontSize radio:"+rem2px/parseFloat(getComputedStyle(document.getElementById("square"),false)["font-size"]) + "</p>"
        str += "<p>os:"+BrowserDetect.OS + "</p>";
        str += "<p>browser:"+BrowserDetect.browser+"</p>";
        str += "<p>version:"+BrowserDetect.version+"</p>";
        document.getElementById("show").innerHTML = str;
        document.getElementById("test").style["font-size"] = window.innerWidth/25 + "px";
        document.getElementById("test").innerHTML += window.innerWidth/25 + "px";
    }
    var st = document.createElement('style');
    var portrait = "@media screen and (min-width: " + window.innerWidth + "px) {html{font-size:" + ((window.innerWidth / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}";
    var landscape = "@media screen and (min-width: " + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}"
    st.innerHTML = portrait + landscape;
    head.appendChild(st);
    return defaultFontSize
};
var defaultFontSize = adapt(720, 30);//