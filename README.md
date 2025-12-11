# SoundCloud Downloader

Desktop app that allowes easy browsing and downloading songs from soundcloud.

<p align="center">
<img width="643" height="645" alt="Screenshot 2025-12-08 163733" src="https://github.com/user-attachments/assets/5e35d078-9b96-4b38-8bf3-f96737af6c1a"/>
</p>

## Requirements
  
The program will not work without yt-dlp, Install it from the link below

- https://github.com/yt-dlp/yt-dlp/releases

## Installation

Download the latest version from the **[Releases page](../../releases)**.

### Windows
1. Install `yt-dlp` from `https://github.com/yt-dlp/yt-dlp/releases`
2. Download the `.zip` file from releases  
3. Extract the folder  
4. Open the extracted folder  
5. Run `SoundCloud Downloader.exe`

### Arch Linux
1. Install `yt-dlp` via `sudo pacman -S yt-dlp`
2. Download `Soundcloud.Downloader-1.0.1-linux.AppImage` from releases
3. Run the app


## Build from source

To build the application yourself you'll need to install `node.js`:

in terminal :
  ```
  git clone https://github.com/poppy221/soundclouddownloader.git
  cd soundclouddownloader
  npm install
  npm run dist
  ```

After building the `Soundcloud Downloader.exe` will be located in `dist/win-unpacked`.

On linux the `.AppImage` file will be located in `dist/` but you can also run the executable located in `dist/linux-unpacked`.

  
  
  
