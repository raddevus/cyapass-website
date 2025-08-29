---
title: Destroy All Passwords, Never Memorize A Password Again 
slug: howItWorks 
publishDate: 29 Aug 2025
description: Discover How C'YaPass Generates Your Password Every Time 
---
After deploying my C'YaPass app to the Windows Store a lot of people are asking for more details about what it does and how it works. I hope this article answers those questions.

## What Is This Article Really About?
This article is an attempt to start a conversation related to the following subjects:

1. passwords are annoying and cause vulnerabilities for numerous reasons.
2. Why do we require users to memorize and create passwords when they are obviously incapable of creating strong passwords?
3. Provide a way to solve the problem using the FOSS(Fully Open Source Software), Cross-Platform C'YaPass program.

## Think Differently About Passwords
One of the biggest problems with passwords is:

<blockquote>User's Create Weak Passwords</blockquote>
User's create bad passwords, based upon common words they can remember.

Creating bad passwords based upon words found in natural language allows hackers to do dictionary attacks against passwords. In other words, hackers can keep on guessing words or word-pairs until they've guessed the user's password.

The other main problem with passwords is:

<blockquote>Requiring the User To Know Their Passwords Creates Vulnerability</blockquote>

Because user's have to memorize their passwords, they end up creating weak passwords (so they can remember them). Or, they end up writing them down. Saving them in a file or use other methods which create additional vulnerabilities.

## Think About This
Any password that is based upon words is ultimately weak. That's because eventually some algorithm will shove enough words together and replace enough alpha characters with numbers (th1nkAb0ut1t) that it will generate the password.

## What's The Alternative?
A password made up of entirely random characters.

## Imagine This Method of Generating Your Password
The next time you sign up for a web account and you are going to add your password, do the following:

** just start mashing all over your keyboard **

Here's mine: ```e3gh9pqweyr73y8t603```

Now that is a strong password. It's random. However, you can't create an algorithm that re-generates the same random events that created it.

## How Can You Memorize the Un-memorizable?
But, how can someone remember a password that is random?

They'd have to write it down somewhere or store it in a spreadsheet 😆 (yes, people really do this).

## Randomly Generated Passwords Is What It Is All About
That's what this article is all about:

## Generating a password that is so random it cannot be guessed
Not storing the password anywhere! How is that possible? I will show you in this article.
However, to show you how this would work, first we need to talk about hash functions.

## Do You Know What a Hash Function Is?
We can think of a hash function (or just hash) as a one-way encryption technique.

That means the computer algorithm takes an input and will turn that exact input into one and only one output.

A simple diagram of this might look like the following:

<img src="/assets/blog/howItWorks/hiw_001.png">

I use a black box (in the diagram) for the SHA-256 hashing algorithm, because we don't have to know how it all works. All we have to know is :

1. one input will produce an output
2. the same input will always produce the same output

## One-Way Encryption: Why?
But why do we call it a one-way encryption? That's because it is unfeasible that anyone can reverse the process to turn the hash value :
```ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb``` back into the ClearText (the letter a in our case).

## A Hash Can Be Used To Identify A File
Did you know that you can use a SHA-256 hash to identify a file? That's right all you do is read all the bytes into a string and pass it to the SHA-256 algorithm and you'll get a hash. Since there is one output for every unique input, if the bytes are the same (in the same order) for two files then they will produce the exact same hash.

## We Can Prove It With VirusTotal
I've created a text file named a.txt that contains only the ascii letter a in it. That's the same input that we had for the SHA-256 algorithm in the diagram above.

## Have You Ever Used VirusTotal.com?
VirusTotal allows you to scan any file with over 60 different anti-virus software packages. All you have to do is go to the site and upload your file.

## VirusTotal Identifies Every File
VirusTotal uses the SHA-256 algorithm to identify files which are uploaded. That way if two people upload the same Windows DLL the system will know they are the same file and if it was safe for one person it will be safe for the other.

Check out what I get when I upload my `a.txt` file:
<img src="/assets/blog/howItWorks/hiw_002.png">

If you click the [Details] tab you will see that VirusTotal actually runs a few Hash algorithms on the file (MD5, SHA-1, SHA-256).
<img src="/assets/blog/howItWorks/hiw_003.png">

The important thing to note is that the value shown for the SHA-256 is the exact same value we see in my original diagram:

`ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb`

## Every File Has It's Own Fingerprint
Since every unique file has a unique set of bytes, every file has its own unique fingerprint.

## Every Set Of Bytes, Has It's Own Fingerprint
Take that one step further and you can see that every set of bytes has it's own unique SHA-256 Fingerprint.

## What About Collisions?
A collision is when two different inputs actually produce the same hash output.

Collisions are possible because although SHA-256 produces a value that is 2^256 (an integer with a max value of something like:<div> `115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936`</div>

-- let's call this number HUGE-NUMBER) the output is not infinite. However, the number of inputs are infinite.

You can keep on generating new random inputs and generate a new SHA-256 hash. At some point the number of inputs exceeds the value of HUGE-NUMBER and a collision occurs (a duplicate HASH from two different inputs).

However, collisions are improbable and theoretically wouldn't occur after 100s of years of attempting to generate a collision.

This means that any input will produce 1 value out of HUGE-NUMBER.

## Reach In Bag, Pull One Random Item Out
Consider this experiment.

Reach into a bag with HUGE-NUMBER of items and randomly pull one item out.
Throw the item back into the bag with the rest of HUGE-NUMBER items.
Reach in a second time and attempt to randomly pull the same one out again. Theoretically impossible!
The point of all that is that at present time, no one believes there is a vulnerability in the SHA-256 algorithm.

## But Couldn't Someone Make Lookup Tables For Hashes?
That's a very good question.

Since every input has an exact SHA-256 output, a person could create a huge database that maps millions of inputs (cleartext passwords) to SHA-256 values.

Here are some words and their equivalent SHA-256 hashes.
<img src="/assets/blog/howItWorks/hiw_004.png">
No alt text provided for this image
That's Why We Need A Salt
In order to make it more difficult (or theoretically impossible) for someone to get our original value, we need to add a 2nd value to our initial input. This 2nd value is called a salt.

## Salt: Additional Word Or Phrase
For example we could create an additional word or phrase that we would append to every input that we will hash.

Here's all of the previous words with their associated hashes after adding the same salt to each one.
<img src="/assets/blog/howItWorks/hiw_005.png">

As you can see, every hash is drastically different than they are in the first chart.

## Make The Mental Leap
Now, let's make our mental leap on how we can use the SHA-256 to make better passwords.

## Here's The Big Payoff
Let's just use the SHA-256 hash as our password. What!?!

I'm saying, generate a SHA-256 hash and then enter that in the password field.

For example, I could hash my website name with a secret salt and have a password for that site.

Let's call that thing the site-key. It's the key I'll use for the site I'm logging into. It's really just a reminder so I know which one I'm using for a particular site or service I'm logging into.

## The Formula For Passwords
Hash(Site-key + Salt) = SHA-256 = Password.

Here's a chart showing 4 web sites and the associated passwords (hashes) I would use for them.
<img src="/assets/blog/howItWorks/hiw_006.png">

## See Bonus Material (below)
See the last section of this article (Bonus Material) to see sample code in NodeJS & C# that will allow you to generate your own SHA-256 values.

## Your Password Wouldn't Be Stored Anywhere
You could do all of this work and then your password wouldn't actually be stored anywhere. Instead it would be generated from those two pieces of data (ClearText site-key and the salt value).

But, it might be kind of a pain to manage it all.

That's why I created C'YaPass. It does all of this for you.

And, to make sure your salt is unique, it lets you draw a shape to create the salt.

## Let The User Draw Their Password
You can get the open source code at: <a href="https://github.com/raddevus/CYaPass-Electron" target="_blank">my github repo</a>.

It's an ElectronJS app which will run on all three major platforms (Win,MacOS,Linux).

You can view the readme at GitHub and it'll show you the 3 easy steps to get the code and start it up.

Here's how you'll use the app.

You'll follow the simple steps:

1. add your site-key(s)
2. draw a pattern
3. paste your password to the site you want to log in.

##Paste Your Password
You can simply copy it, because each time the password is generated, it is copied into your clipboard so you can paste it.

## Remembers Special Password Requirements
You know all of those super annoying password requirements that each site sets up differently? Things like:

- include uppercase
- include special character
- length limitation (which is terribly bad) -- yes some sites allow a password to only be so long (20 or 16 chars).

C'YaPass remembers all of those for you.

When you add a password, you initially set all of the password requirements that you want set. It looks like the following:

No alt text provided for this image
You never have to remember them again, because each time you generate your password, C'YaPass will remember them for you.

See here is the anotherOne password that is 16 characters, contains a special character and includes an uppercase : Ab#9e4235938f5dc

No alt text provided for this image
Only Have To Create One Pattern
Since the graphic pattern generates a unique salt value depending on the pattern you draw and since the final hash password is dependent upon the site-key and the graphic pattern, every site-key will generate a different password hash with the same graphic pattern.

Just switch your selection of the site-key and the new password is copied to your clipboard and ready to go.

No alt text provided for this image
Every Login Has Extremely Strong Unique Password
This also means that every one of your sites and services will have a different and super strong password.

Your Password Is Generated Every Time
Allow me to repeat the fact that your password is not stored anywhere. It is not stored locally or remotely (in a local file or on a remote server).

Instead, you password is generated every time.

The One Thing
The one thing that is stored (in JSON) is your site-key that's the first part of the two-part salt.

Your Pattern Is Not Stored
The pattern you draw to salt your site-key is not stored anywhere either.

This means that an attacker would have to get your site-key and reproduce your pattern in order to generate your very strong password.

GitHub Source Code : FOSS (Fully Open Source Software
Grab the code and try it out. It's all open source so you can examine it for yourself.

Android Users
Android users can get the app at the Google Play store. Try it out and see what you think. It's really nice on mobile devices because you can use strong passwords and never have to type them again. It's so difficult to reproduce a strong password by typing.

Windows 10 Users
https://www.microsoft.com/en-us/p/cyapass/9pfd82d1z7rw

Or just open the Windows Store from your Win 10 Start menu and search for "cyapass".

Apple Users
Apple I had an iOS native app in the App store but I let my dev account lapse and the app was never quite as good as the Android version.

You can get to the app as a PWA (Progressive Web App) at : http://cyapass.com/js/cya.htm

This app will work offline and is a very good way to try out the app in your browser.

Linux Users
Linux users can install the app directly from the Snap store at: https://snapcraft.io/cyapass.

You can also read some articles and more about C'YaPass development at my official C'YaPass web site: http://cyapass.com.

### Bonus Material (For Devs and Other Techies) ###
If you'd like to try generating your own SHA-256 hashes, the easiest way to do it is if you have NodeJS installed on your machine.

Node Method
If you do, then go to a command prompt (console or terminal) and type

$ node -- starts the node REPL

>Crypto = require('crypto'); -- loads the crypto library

>Crypto.createHash("sha256").update("your text").digest().toString("hex") -- generates the hash and prints it on console

There is not supposed to be a break in that second line where the createHash method is called. And the "your text" string is the string that you want to hash.

Here's a snapshot of it in action.

No alt text provided for this image
C# Method
First, go and get LinqPad: The Programmer's Playground

NOTE: Make sure supersimple.txt file contains the data you want to hash and that the path is correct in the short sample below.

Then use the following code:

// using System.Security.Cryptography
 SHA256 mySHA256 = SHA256Managed.Create();
 // convert string into bytes
 byte [] allBytes = File.ReadAllBytes(@"c:\temp\supersimple.txt");
 // compute the hash for the bytes provided
 byte [] hashBytes = mySHA256.ComputeHash(allBytes);
 StringBuilder outstring = new StringBuilder();
 // create a string of hex values for output
 foreach (byte b in hashBytes ) { 
     outstring.AppendFormat("{0:x2}", b);
 }
 Console.WriteLine(outstring.ToString());
PowerShell Version
Open up a PowerShell window in Win10 and use the following code to generate a SHA-256 Hash. Simply change the string value that is passed in on the third line of the code.

$stringAsStream = [System.IO.MemoryStream]::new()
$writer = [System.IO.StreamWriter]::new($stringAsStream)
$writer.write("a")
$writer.Flush()
$stringAsStream.Position = 0
$outHash = Get-FileHash -InputStream $stringAsStream | Select-Object Hash
$outHash.hash.ToLower()
