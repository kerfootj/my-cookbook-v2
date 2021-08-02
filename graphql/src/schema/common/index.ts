import { ClassType, Field, ID, ObjectType } from 'type-graphql';

/**
 * Adds id, created_at, and updated_at properties to objects
 */
export function withDefaults<TClassType extends ClassType>(
    BaseClass: TClassType,
): ClassType {
    @ObjectType({ isAbstract: true })
    class EntityBase extends BaseClass {
        @Field((type) => ID)
        id: string;

        @Field()
        created_at: Date;

        @Field()
        updated_at: Date;
    }

    return EntityBase;
}
