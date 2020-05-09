import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1588983810675 implements MigrationInterface {
    name = 'CreateTables1588983810675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "items_groups_groups" ("itemsId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "PK_c33758fd30c3406ddb467aaff27" PRIMARY KEY ("itemsId", "groupsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b6202ad4e80f985a461b684cfa" ON "items_groups_groups" ("itemsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b7470bf45dad5cbba705465a45" ON "items_groups_groups" ("groupsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "items_groups_groups" ADD CONSTRAINT "FK_b6202ad4e80f985a461b684cfae" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "items_groups_groups" ADD CONSTRAINT "FK_b7470bf45dad5cbba705465a457" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_groups_groups" DROP CONSTRAINT "FK_b7470bf45dad5cbba705465a457"`, undefined);
        await queryRunner.query(`ALTER TABLE "items_groups_groups" DROP CONSTRAINT "FK_b6202ad4e80f985a461b684cfae"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b7470bf45dad5cbba705465a45"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b6202ad4e80f985a461b684cfa"`, undefined);
        await queryRunner.query(`DROP TABLE "items_groups_groups"`, undefined);
        await queryRunner.query(`DROP TABLE "items"`, undefined);
        await queryRunner.query(`DROP TABLE "groups"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
