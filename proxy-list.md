# Proxy List

این فایل توسط workflow شماره ۵ ساخته شده است.

> مقدار `ping_ms` زمان رفت‌وبرگشت یک درخواست HTTP/HTTPS از داخل GitHub Actions از مسیر همان proxy است؛ ICMP ping نیست.

## Fastest proxies

| Rank | PROXY_SERVER | PROXY_USERNAME | PROXY_PASSWORD | ping_ms | protocol | status | observed_ip | source |
|---:|---|---|---|---:|---|---:|---|---|
| 1 | `http://198.199.86.11:3128` | `` | `` | 253 | `http` | 200 | `198.199.86.11` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |
| 2 | `http://86.104.72.219:1081` | `` | `` | 347 | `http` | 200 | `86.104.72.219` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |
| 3 | `http://174.138.162.235:8001` | `` | `` | 544 | `http` | 200 | `73.151.25.68` | `https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt` |
| 4 | `http://174.138.162.238:8254` | `` | `` | 588 | `http` | 200 | `98.172.221.74` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |
| 5 | `http://181.78.17.131:999` | `` | `` | 625 | `http` | 200 | `190.60.34.250` | `https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt` |
| 6 | `http://174.138.174.173:8001` | `` | `` | 686 | `http` | 200 | `73.128.185.154` | `https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt` |
| 7 | `http://87.120.205.164:444` | `` | `` | 756 | `http` | 200 | `87.120.205.164` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |
| 8 | `http://174.138.161.166:8001` | `` | `` | 764 | `http` | 200 | `38.21.229.63` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |
| 9 | `http://173.212.245.136:8888` | `` | `` | 854 | `http` | 200 | `173.212.245.136` | `https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt` |
| 10 | `http://174.138.162.197:8254` | `` | `` | 856 | `http` | 200 | `187.134.244.208` | `https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt` |

## استفاده در workflow شماره ۴

در workflow `🌐 4-Browse the Web` مقدار `proxy_mode` را روی `fastest-from-file` بگذارید تا ردیف اول همین فایل استفاده شود. برای انتخاب ردیف دیگر، `proxy_mode=rank-from-file` و `proxy_list_rank` را برابر شماره ردیف جدول بگذارید.

فایل ماشینی متناظر: `proxy-list.json`
