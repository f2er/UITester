function FindProxyForURL(url,host)
    {
      if (shExpMatch(url,"*__TEST__*"))
          return "PROXY uitest.taobao.net:80"
      else
          return "DIRECT"
     }