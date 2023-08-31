# Setup
 [Docker installation details](https://docs.docker.com/get-docker/)
 
 Make sure docker settings in this file `~/.docker/config.json` has these content:
```
{
	"auths": {},
	"credsStore": "osxkeychain"
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
