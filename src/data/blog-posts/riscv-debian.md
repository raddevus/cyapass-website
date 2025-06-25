---
title: Running RISC-V Debian In QEMU
slug: riscv-debian
publishDate: 28 May 2024
description: Step-by-step Setup & Run RISC-V on Debian 
---

## Background
I recently stumbled upon this new book that I’m reading right now:

<a href="https://amzn.to/43UdTHk" target="_blank">RISC-V Assembly Language Programming[^]</a>: Unlock the Power of the RISC-V Instruction Set (amazon affiliate link)

It is a fantastic book for learning Assembly running on RISC-V machines : the RISC-V ISA (Instruction Set Architecture).

The book explains how to run a RISC-V based version of Ubuntu in the QEMU emulator.

After a lot of research, I’ve discovered the simplest way to get a QEMU RISC-V Linux image running. This one will run Debian and it is far smaller than the Ubuntu one too so it will consume less memory on your main Linux (where you run QEMU).

The Simple Steps
Here are the simple steps:

## Pre-Step

Install QEMU on your system.  Follow the instructions <a href="https://www.qemu.org/download/" target="_blank">at the official QEMU site[^].</a>


1) go to <a href="https://people.debian.org/~gio/dqib/" target="_blank">Debian Quick Image Baker pre-baked images[^]</a> — this contains all the latest build images for QEMU virtualization (including a RISC-V build.

2) When you get there, look for the link labeled: “Images for riscv64-virt” — clicking that link (<a href="https://gitlab.com/api/v4/projects/giomasce%2Fdqib/jobs/artifacts/master/download?job=convert_riscv64-virt" target="_blank">Images for riscv64-virt[^]</a>) will instantly begin the download of a (zip) file which is named very oddly, like a hash value (2baed3d2ab30e7a4ff39c7e587c8b16dce3885afb2dc047dae555a8bc13e is the current name).

3) Once you download it, you can unzip the contents to its own folder to keep everything organized.

The contents of that file are:
```bash
image.qcow2 — image file
initrd – linux stuff
 kernel – linux kernel
 readme.txt – readme provides command line for QEMU
 ssh_user_ecdsa_key — stuff I don’t know
 ssh_user_ed25519_key — don’t know
 ssh_user_rsa_key — don’t know.
```
The readme contains the QEMU command that you can use to start virtual environment.

## We Need Two Additional Files
We actually need two additional files which are the bios and the kernel files for RISC-V Linux.

1. `fw_jump.elf`
2. `uboot.elf`

These files are part of the Open Source Supervisor Binary Interface.

For more information you can learn about them at : 

<a href="https://github.com/riscv-software-src/opensbi/tree/master" target="_blank">GitHub - riscv-software-src/opensbi: RISC-V Open Source Supervisor Binary Interface[^]</a>

Download `uboot.elf` & `fw_jump.elf`
You can actually download those two files and place them anywhere you want on your local computer.

<a href="https://github.com/Apress/RISC-V-Assembly-Language-Programming/tree/main/Chapter%201/QEMU" target="_blank">RISC-V-Assembly-Language-Programming/Chapter 1/QEMU at main · Apress/RISC-V-Assembly-Language-Programming · GitHub[^]</a>

Make sure that when you download each file that you download the RAW file.  GitHub does a weird thing and will download them as odd text files if you don't use the RAW option.

## Download To Your Local Machine
Just make sure you reference the full path to them (wherever you placed them on your machine) when you run the QEMU command below.

You can see those two files are referenced in the QEMU command below.

**Note**: There cannot be any spaces after the line-continuation-character (\).

I've broken the command up over lines so you can see each argument which is passed to the QEMU executable?  Did you know there is a separate EXE for each QEMU platform (riscv64, x86_64, etc.)?  

```bash
qemu-system-riscv64 -machine 'virt' \
-cpu 'rv64' \
-m 1G -device virtio-blk-device,drive=hd \
-drive file=image.qcow2,if=none,id=hd \
-device virtio-net-device,netdev=net \
-netdev user,id=net,hostfwd=tcp::2222-:22 \
-bios /usr/lib/riscv64-linux-gnu/opensbi/generic/fw_jump.elf \
-kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
-object rng-random,filename=/dev/urandom,id=rng \
-device virtio-rng-device,rng=rng \
-nographic \
-append "root=LABEL=rootfs console=ttyS0"
```

Once you start the virtual environment login using :

root (username) and root (pwd)

Now you can install the **build_essential** packages so you can write assembly and link.
You are root so no need for sudo:

`$ apt install build-essential`

You can check that the Assembler (as) and the linker (ld) are installed after that, by doing the following which will give you the versions of each exe.

`$ as --version`

`$ ld --version`

Once you do that you can open up the nano editor and write your asm and go through the rest of the samples in the book (<a href="https://amzn.to/43UdTHk" target="_blank">RISC-V Assembly Language Programming: Unlock the Power of the RISC-V Instruction Set[^]</a>).

## Points of Interest

If you've ever wanted to emulate machines running QEMU (<a href="https://www.qemu.org/">QEMU Offical site / docs[^]</a>). This will be a good starter for you.  I had to work through a lot to get this going since I've never ran QEMU on my own before.

If you try this out and get Debian running on your machine, I think you'll be pleasantly surprised.

I got this running on my Mac Pro M3 Laptop too.  I'll write that one up soon too.

## History

May 28, 2024 - First publication
