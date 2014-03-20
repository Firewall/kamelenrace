Camelrace
=========

Project by Ewout Merckx, Robin Geldolf &amp; Matt Demyttenaere

Made for Projects 2 course at KaHo Sint-Lievens

###Install

Download and install meteor &amp; meteorite

```
curl https://install.meteor.com | /bin/sh
npm install -g meteorite
git clone git@github.com:Firewall/kamelenrace.git
```

Now run mrt to install packages

```
mrt
```

The snap.svg package does not install correctly. To fix this:

```
mv packages/dist packages/snap-svg/lib/ 
```

Now we are ready to run 

###Run

```
mrt
```

Meteor should now be running at `http://localhost:3000`





