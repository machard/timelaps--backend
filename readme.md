![](http://www.machard.io/content/images/2015/05/tweetcam-1.png)

The backend is a node app getting tweets geotagged from twitter using the `locations` parameter.

If you look in the config you'll see a list a zones
```javascript
  twitter_regions : {
    doc : ' Regions associated with each twitter stream',
    format : Array,
    default : [
      ['00', '02'], // us ouest
      ['01', '03'], // us east
      ['21', '30', '31'], // amerique sud, afrique, australie
      ['12'], // europe centrale
      ['10', '11', '13'] //europe nord + asie
    ],
    env : 'twitter_regions'
  },
```

They are encoded following the quadtree method.

I needed to split the space to avoid hitting the Twitter rate limit.

#Run locally

You'll need to set up your tweeter credentials in a .twitter file.
You need 6 apps unless you remove/change the twitter_regions config.

```javascript
{
  "twitter_consumer_key" : [
    "AQJzdkTSAjICgC0deGfYI****",
    "AEHPjf2gLv2nUWFnR1K35h****",
    "drjT7E0G2nhZtAP589wNlF****",
    "j1RZd2cXOj5j3rZd3PIrjR****",
    "683tYRrvozD0tDAMJFMde****"
  ],
  "twitter_consumer_secret" : [
    "LWPKKiLL3Qzehy6PCp7Rhu5ZwFetJvKD11wnyrJvU5Yb0Ec****",
    "vaYJfJ2Qg911WWtXZ1TO1VjHClHHnVVghqu7XN8iHBomSLb****",
    "FaHsr8biuUrg5yiMD2pfCgJuHEgIOvwAbxeSzVhNML3bEnY****",
    "60pw8PgsjoiDPnG61p3kqahNxl2mQhrhtjGadnt4g0IJyGn****",
    "CVGA2czELEwFvEmnVBjCm8mZptmeSVJHtrHUzHBlQhalcU****"
  ],
  "twitter_consumer_access_token" : [
    "399917385-ZKN8NUSq4pCJO43SqKn60Y3BYG2myW79UgMYx****",
    "399917385-QadN3nau1ZxX9X8BHbPQpYWtROX4XmMLaXCdr****",
    "399917385-ntY6BUK6sCMnW17Jd8XZH1U2uw0tAnd0JaCfc****",
    "399917385-OnLJwz6h963GliolHG2xYWTRTceQbnVZPxcTE****",
    "399917385-Ha0pyw5yC4N5QBdQU2cqvzyFozSSB2xAhATp****"
  ],
  "twitter_consumer_access_token_secret" : [
    "rQ5xDGgELBmwXXZx6BCOHMUq8SI3aHYHgEqShAvk9l****",
    "RQQATyPKe9v27lh7rIRmGrz0pKNFymIVnxt979m5Vj****",
    "mZMxe2MZPl8nzVXLeKkYgt8GkKkApBXWmpQ7ZxtVRJ****",
    "lwjkJ2jtAUaJSkcQgL3Oi0PdO76GgKDUceFDPSzA6F****",
    "bTWUr3EszVVsEKTFrHWixOaLBuMIuCX5G2kE3pFB2****"
  ]
}
```

You need to install and run rabbitmq with the webstomp plugin.
Edit the config file accordingly (rabbituri)

then run

```
npm run dev
```

#Run remotely

The app has been packaged to run on Google Cloud platform
Every config parameters can be set using environments variables.
Array can be passed as value1,value2,..

to deploy on google see
https://cloud.google.com/sdk/gcloud/reference/preview/app/deploy

# Running Rabbitmq on google

You can use the click and deploy method but you'll get a static cluster.
If it's ok with you, you're done.

If not, it is a good starting point as you can tweak the provided instance templates.
The idea is to add all instances to the same target pool and then join the cluster by connecting
to the oldest instance of the pool.

To get the oldest instance of the pool :

```bash
function get_instance_list {
  local view_name="$1"
  local zone="$2"

  gcloud compute instances list --zone=${zone} --sort-by creationTimestamp --regexp ^${view_name}-[a-z0-9]{4}$ | awk '{print $1}' | awk '{if (NR!=1) {print}}'
}
```


Then set up routing rules and create a static ip forwarding to the target pool. This way you use this front ip to connect to the cluster.
Create an instance group using your template, set up scaling rules, and launch it!

The cluster will be able to scale up and down. Even if the stats node is removed. Even if multiple node are added/removed at the same time.


# visualize

To visualize the medias in realtime on a map. please check the client [repo](http://github.com/machard/timelaps-client).
The idea is to use the webstomp plugin as a websocket/long-polling bridge.
I take advantage of the rabbit routing capacities allowing client to only register to the displayed zone.
And all of this scales obviously.


