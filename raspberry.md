# Setup
[Raspberry Pi](https://www.raspberrypi.com/software/)
[Ubuntu](https://ubuntu.com/download/raspberry-pi)
[Docker installation details](https://docs.docker.com/desktop/install/ubuntu/)
 
 Make sure docker settings in this file `~/.docker/config.json` has these content:
```
{
	"auths": {},
	"credsStore": "desktop",
	"currentContext": "desktop-linux"
}
```

* Clone repository
```
cd ~
git clone https://github.com/Lantore-Energy/radius-desk
cd radius-desk/rdcore/docker
```

- Run 
```
sudo sh ./local_build.sh
```
