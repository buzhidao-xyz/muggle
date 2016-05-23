Muggle
=================
> windows

ruby
-----------------
>[RubyGems 镜像 - 淘宝网](https://ruby.taobao.org/ "RubyGems 镜像 - 淘宝网")

* install rubyinstaller-2.2.3-x64.exe
* config ssl-ca -> copy cacert.pem to F:/ssl/
* config system env
* 
		变量名(N):SSL_CERT_FILE
		变量值(V):F:\ssl\cacert.pem
* Log off your computer
* switch sources
* 
		gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
		gem sources -l
* install sass, compass
* 
		gem install sass compass
* done

npm-yeoman
-----------------
* install node-v6.2.0-x64.msi
* npm update
* 
		npm install -g npm
* install tools
* 
		npm install -g grunt-cli bower gulp sass compass
* install yeoman
* 
		npm install -g yo
* install generator-karma generator-angular
* 
		npm install -g generator-karma generator-angular
* copy phantomjs-2.1.1-windows.zip to C:/Users/Admin/AppData/Local/Temp/phantomjs/
* change dir to project-folder
* 
		yo
		Run a generator->select angualar
* make some select -> Y/N
* 
		Gulp->N
		Sass->Y
		Bootstrap->Y
		Bootstrap Sass->Y
		angular-tool->select all
* done

grunt cmd
-----------------
* Build & development

Run `grunt` for building and `grunt serve` for preview.

* Testing

Running `grunt test` will run the unit tests with karma.
