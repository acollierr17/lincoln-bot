# Code Challenge Instructions - Win Discord Nitro1

Hey, all! Here are the instructions and rules regarding this code challenge! If you have no idea what this challenge is about, please refer to [this video]() on the channel.

## Rules
1) You must use a linter that abides by the `.eslintrc` file in this repository as a base. Read the [Linting](#linting) section for more information. Check out this video for more information on linting
2) You're expected to have followed the standards that have been shown throughout [the series](https://thenerdcave.us/discordjs) and in general good JavaScript and Node.js practice. There's plenty of really good information online (for example, the descriptions of my videos). You just have to be resourceful!
3) When reviewing other pull requests and commenting on code, please be fair and provide constructive criticism. Any sort of disrespect or trying to bring another person down is not tolerated
4) With Rule 3 in mind, you are to be open for contructive critism from myself and other commenters on your pull request. We all grow by helping each and being willing to listen

## Resources
Here are some resources that I have mentioned in the video as well as linked in the video's description. Make sure to check these out if you're are familiar with Git and GitHub!

- [Git & GitHub Crash Course For Beginners | Traversy Media](https://www.youtube.com/watch?v=SWYqp7iY_Tc)
- [About pull requests | GitHub Help](https://help.github.com/en/articles/about-pull-requests)
- [Creating a pull request | GitHub Help](https://help.github.com/en/articles/creating-a-pull-request)

## Usage Instructions
1) Fork this repository
2) Clone your forked repository to a new folder on your computer and open that folder 3) your editor
4) Run `npm install`
5) Rename `.env.example` to `.env` and fill in the required information
6) Run the bot via `npm start`

## Opening A Pull Request
When you have made your changes in the `commands/config.js` file, you will have to open a pull request in this repository. Follow the rundown below. Refer to the links about pull requests above. Here is a basic rundown:

- Refer to steps 1 & 2 in the [Usage Instructions](#usage-instructions) section
- Create a new branch called `patch-1` or `config-1` by doing `git branch -b <branch-name>`
- Follow steps 3 - 5 in the [Usage Instructions](#usage-instructions) section
- Make your changes in the `commands/config.js` file
- Commit your changes to your forked repository and open a pull request (make sure `acollierr17/lincoln-bot:master` is the base branch and `<your-username>/lincoln-bot:<your-new-branch>` is your branch you committed)
- Fill out the pull request information
- Wait for a response and check out other pull requests and comment while you're at it

## Linting
Before you make a pull request, you will need to lint your code. If you don't, Travis CI will display the error in the build log.

- Run `npm run test` to test your code and to see if there are any issues displayed in console
- If there are any issues, run `npm run lint` to fix the linting errors