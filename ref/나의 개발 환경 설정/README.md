# Terminal 설정

경로들은 다르겠지만 아래와 같이 터미널 설정을 주로 한다.

```sh
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[\033[31m\]$\[\033[m\] \[\033[33m\]\w\[\033[32m\]\$(parse_git_branch)\[\033[36;1m\] >> \[\033[m\]"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/Contents/Home
export ANT_HOME=/usr/local/apache-ant-1.10.1
export PATH=$JAVA_HOME/bin:/usr/local:$PATH:/Users/jake.lim/Library/Android/sdk/platform-tools/:${ANT_HOME}/bin
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
export BLOCKSIZE=1k

alias f='open -a Finder ./'
alias c='clear'
alias ls='ls -GFh'
alias la='ls -al'
alias ll='ls -FGlAhp'

alias qf="find . -name "
```

# Visual Studio Code 설정

## 설치

[Visual Stuido Code](https://code.visualstudio.com/)

> 참조: [VSCode 추천 익스텐션과 세팅 (VSCode Recommended Extensions and Settings)](https://www.vobour.com/vscode-%EC%B6%94%EC%B2%9C-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98%EA%B3%BC-%EC%84%B8%ED%8C%85-vscode-recommended-e)


## 확장 프로그램 사용법

### Setting Sync

* Upload your settings
	
	```
	Shift + Alt + U를 누르고 팔레트 창에 위에서 만든 토큰을 입력하고 Enter
	```
	
* Download your settings to other devices

	```
	Shift + Alt + D를 누르고 팔레트 창에 위에서 획득한 Gist ID를 입력한 다음 Enter
	```

> 참조: [gist를 이용하여 기기 간 vscode 설정 동기화](https://medium.com/@kyo504/gist%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B8%B0%EA%B8%B0-%EA%B0%84-vscode-%EC%84%A4%EC%A0%95-%EB%8F%99%EA%B8%B0%ED%99%94-c856082b7362)