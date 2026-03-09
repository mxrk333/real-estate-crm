import FtpDeploy from "ftp-deploy";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
    user: "lmscrmapi",
    // Password was swapped with host in previous edit. 
    // Please verify this is your actual password.
    password: "Markpatigayon22", 
    // Host needs to be the FTP server address, usually ftp.yourdomain.com or an IP
    host: "ftp.innersparcrealty.com", 
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/lms-crm.innersparcrealty.com/",
    include: ["*", "**/*"],
    deleteRemote: false,
    forcePasv: true,
    // Try enabling secure connection (FTPS)
    secure: true,
    secureOptions: { rejectUnauthorized: false }
};

ftpDeploy.deploy(config)
    .then(() => console.log("Deploy finished"))
    .catch(err => console.log(err));
