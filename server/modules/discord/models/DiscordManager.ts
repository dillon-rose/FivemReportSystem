import { Client, Intents, Guild, Role } from "discord.js";
import config, { TStaffRole } from "@server/sv_config";
import { Permission, Staff } from "@common/types";

class DiscordManager {
    static guildId = config.MAIN_GUILD_ID;
    
    private client: Client;
    private guild: Guild | undefined;

    private allStaff: Map<string, Staff>;

    constructor() {
        this.allStaff = new Map<string, Staff>();

        this.client = new Client({
            intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT],
        });

        console.log("Logging in to discord...");

        this.client.on("ready", async () => {
            console.log(`Logged in as ${this.client.user?.tag}!`);

            this.guild = await this.client.guilds.cache.get(DiscordManager.guildId);
            this.allStaff = await this.getAllStaff();

            this.client.on("guildMemberUpdate", async (oldMember, newMember) => {
                if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
                    const isOldStaff = oldMember.roles.cache.has(config.STAFF_ROLE_ID);
                    const isNewStaff = newMember.roles.cache.has(config.STAFF_ROLE_ID);

                    if (isOldStaff && !isNewStaff) {
                        this.allStaff.delete(newMember.id);
                    }
                    else if (!isOldStaff && isNewStaff) {
                        this.allStaff.set(newMember.id, {
                            name: newMember.displayName,
                            discordId: newMember.id,
                            rank: this.getHighestRole(Array.from(newMember.roles.cache.values())).name
                        });
                    }
                }
            });

            emit("FivemReportSystem:server:discordReady");
        });

        this.client.on("error", (err) => {
            console.log(err);
        });

        this.client.on("rateLimit", (rateLimit) => {
            console.log("Rate Limit Exceeded...");
            console.log(JSON.stringify(rateLimit));
        });

        this.client.login(config.BOT_TOKEN);
    }

    public getMemberRoles = async (memberId: string | null): Promise<Role[]> => {
        return await new Promise((resolve) => {
            if (!memberId) resolve([]);

            this.guild?.members.fetch(memberId as string).then((member) => {
                if (!member) resolve([]);

                let roles = member.roles.cache.values();

                resolve(Array.from(roles));
            }).catch((err) => {
                resolve([]);
            });
        });
    }

    public getAllStaff = async (): Promise<Map<string, Staff>> => {
        if (this.allStaff.size === 0) {
            this.allStaff = await this.getAllStaffHelper();
        }

        return this.allStaff;
    }

    public getStaff = async (discordId: string | null): Promise<Staff | undefined> => {
        if (!discordId) return undefined;
        
        const staffMembers = await this.getAllStaff();
        
        return staffMembers.get(discordId);
    }

    public getHighestRole = (roles: Role[]): Role => {
        let highestRole = roles[0];
        let roleVal: Permission = config.STAFF_ROLES[highestRole.name as TStaffRole] || Permission.UNAUTHORIZED;

        for (const role of roles) {
            if (!config.STAFF_ROLES[role.name as TStaffRole]) continue;

            if (config.STAFF_ROLES[role.name as TStaffRole] < roleVal) {
                highestRole = role;
                roleVal = config.STAFF_ROLES[role.name as TStaffRole];
            }
        }
        
        return highestRole;
    }

    private getAllStaffHelper = async (): Promise<Map<string, Staff>> => {
        // cache memebrs
        await this.guild?.members.fetch(); 

        return await new Promise((resolve) => {
            const staffRole = this.guild?.roles.cache.get(config.STAFF_ROLE_ID);
            if (!staffRole) resolve(new Map());

            const staffMemnbners = staffRole?.members;
            const staffMap = new Map<string, Staff>();

            staffMemnbners?.forEach((member) => {
                staffMap.set(member.id, {
                    name: member.displayName,
                    discordId: member.id,
                    rank: this.getHighestRole(Array.from(member.roles.cache.values())).name
                });
            });

            resolve(staffMap);
        });
    }

}

export default DiscordManager;