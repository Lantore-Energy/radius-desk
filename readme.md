# Setup
 Install Docker

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

 **(VERY IMPORTANT)**

* Edit /radius-desk/rdcore/docker/.env file. Replace the content with this.

```
#content
RADIUSDESK_VOLUME=~/radius-desk/volume
RADIUSDESK_NETWORK=radiusdesk-bridge
```

- Run 
```
sudo sh ./local_build.sh
```


> RUN ``hostname -I`` to get the IP of the device
> ON MACOS ``nslookup hostname``
