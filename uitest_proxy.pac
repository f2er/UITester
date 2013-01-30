function FindProxyForURL(url,host)
    {
      if(shExpMatch(url,"https://*")){
          return "DIRECT"
      }
      if (shExpMatch(url,"*_ut_*"))
          return "PROXY 127.0.0.1:8080"
      else
          return "DIRECT"
     }