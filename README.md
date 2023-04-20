Az alkalmazás futtatása előtt telepítsük fel az adott operációs rendszerhez szükséges programokat
Docker:
- Windows alatt: https://docs.docker.com/desktop/install/windows-install/
- Linux alatt (Keressük ki az adott operációs rendszert a lista közt): https://docs.docker.com/engine/install/

Docker feltelepítése után klónozzuk le a github repository-ban lévő fájlokat a konzol segítségével:
```
git clone <repo_url>
```
Utána lépjünk be a mappába: 
```
cd ./quizterproject
```
Szerkesszük meg a ‘docker-compose.yml’ fájlt az alábbiakkal:
```
Environment HOST_URL & VITE_API_URL
```
Cseréljük ki benne <IP/DOMAIN> placeholdert a számítógép/szerver jelenlegi Hálózati IP címével vagy a Domain névvel.
```
Environment GM_USER & GM_PW
```
Készítsünk egy APP jelszót egy GMAIL fiókhoz, majd állítsuk be az Email-t és az App Jelszót, elsősorban Email Hitelesítéshez szükséges
- Segítség : https://www.jotform.com/help/392-how-to-use-your-gmail-account-as-your-email-sender-via-smtp/

Szerkesztés után a konzolban futtasuk le az adott parancsokat:
docker-compose build
docker-compose up -d
Sikeres inicializáláskor a böngészőnkben az alábbi képen tudjuk elérni:
```
Backend: https://<IP/Domain>:2000
Frontend: https://<IP/Domain>:5173
MongoDB: mongodb://quizterproject:quizterproject@<IP/Domain>:27017/
```
⚠️ MÉG MIELŐTT A FRONTEND OLDALON BÁRMIT CSINÁLNÁNK, ELŐTTE NYISSUK MEG A BACKENDET, ÉS FOGADJUK EL AZ ERR_CERT_AUTHORITY_INVALID PROBLÉMA MIATT! (Hiteles tanusítvány mellet ez nem szükséges!)