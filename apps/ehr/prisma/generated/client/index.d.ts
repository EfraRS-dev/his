
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MedicalHistory
 * 
 */
export type MedicalHistory = $Result.DefaultSelection<Prisma.$MedicalHistoryPayload>
/**
 * Model ClinicalEntry
 * 
 */
export type ClinicalEntry = $Result.DefaultSelection<Prisma.$ClinicalEntryPayload>
/**
 * Model ClinicalDocument
 * 
 */
export type ClinicalDocument = $Result.DefaultSelection<Prisma.$ClinicalDocumentPayload>
/**
 * Model Antecedent
 * 
 */
export type Antecedent = $Result.DefaultSelection<Prisma.$AntecedentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MedicalHistories
 * const medicalHistories = await prisma.medicalHistory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MedicalHistories
   * const medicalHistories = await prisma.medicalHistory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.medicalHistory`: Exposes CRUD operations for the **MedicalHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalHistories
    * const medicalHistories = await prisma.medicalHistory.findMany()
    * ```
    */
  get medicalHistory(): Prisma.MedicalHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicalEntry`: Exposes CRUD operations for the **ClinicalEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicalEntries
    * const clinicalEntries = await prisma.clinicalEntry.findMany()
    * ```
    */
  get clinicalEntry(): Prisma.ClinicalEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicalDocument`: Exposes CRUD operations for the **ClinicalDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicalDocuments
    * const clinicalDocuments = await prisma.clinicalDocument.findMany()
    * ```
    */
  get clinicalDocument(): Prisma.ClinicalDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.antecedent`: Exposes CRUD operations for the **Antecedent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Antecedents
    * const antecedents = await prisma.antecedent.findMany()
    * ```
    */
  get antecedent(): Prisma.AntecedentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MedicalHistory: 'MedicalHistory',
    ClinicalEntry: 'ClinicalEntry',
    ClinicalDocument: 'ClinicalDocument',
    Antecedent: 'Antecedent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "medicalHistory" | "clinicalEntry" | "clinicalDocument" | "antecedent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MedicalHistory: {
        payload: Prisma.$MedicalHistoryPayload<ExtArgs>
        fields: Prisma.MedicalHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          findFirst: {
            args: Prisma.MedicalHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          findMany: {
            args: Prisma.MedicalHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[]
          }
          create: {
            args: Prisma.MedicalHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          createMany: {
            args: Prisma.MedicalHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[]
          }
          delete: {
            args: Prisma.MedicalHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          update: {
            args: Prisma.MedicalHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          deleteMany: {
            args: Prisma.MedicalHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[]
          }
          upsert: {
            args: Prisma.MedicalHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>
          }
          aggregate: {
            args: Prisma.MedicalHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalHistory>
          }
          groupBy: {
            args: Prisma.MedicalHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalHistoryCountAggregateOutputType> | number
          }
        }
      }
      ClinicalEntry: {
        payload: Prisma.$ClinicalEntryPayload<ExtArgs>
        fields: Prisma.ClinicalEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicalEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicalEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          findFirst: {
            args: Prisma.ClinicalEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicalEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          findMany: {
            args: Prisma.ClinicalEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>[]
          }
          create: {
            args: Prisma.ClinicalEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          createMany: {
            args: Prisma.ClinicalEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicalEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>[]
          }
          delete: {
            args: Prisma.ClinicalEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          update: {
            args: Prisma.ClinicalEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          deleteMany: {
            args: Prisma.ClinicalEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicalEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicalEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>[]
          }
          upsert: {
            args: Prisma.ClinicalEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalEntryPayload>
          }
          aggregate: {
            args: Prisma.ClinicalEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicalEntry>
          }
          groupBy: {
            args: Prisma.ClinicalEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicalEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicalEntryCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicalEntryCountAggregateOutputType> | number
          }
        }
      }
      ClinicalDocument: {
        payload: Prisma.$ClinicalDocumentPayload<ExtArgs>
        fields: Prisma.ClinicalDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicalDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicalDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          findFirst: {
            args: Prisma.ClinicalDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicalDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          findMany: {
            args: Prisma.ClinicalDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>[]
          }
          create: {
            args: Prisma.ClinicalDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          createMany: {
            args: Prisma.ClinicalDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicalDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>[]
          }
          delete: {
            args: Prisma.ClinicalDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          update: {
            args: Prisma.ClinicalDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          deleteMany: {
            args: Prisma.ClinicalDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicalDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicalDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>[]
          }
          upsert: {
            args: Prisma.ClinicalDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicalDocumentPayload>
          }
          aggregate: {
            args: Prisma.ClinicalDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicalDocument>
          }
          groupBy: {
            args: Prisma.ClinicalDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicalDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicalDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicalDocumentCountAggregateOutputType> | number
          }
        }
      }
      Antecedent: {
        payload: Prisma.$AntecedentPayload<ExtArgs>
        fields: Prisma.AntecedentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AntecedentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AntecedentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          findFirst: {
            args: Prisma.AntecedentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AntecedentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          findMany: {
            args: Prisma.AntecedentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>[]
          }
          create: {
            args: Prisma.AntecedentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          createMany: {
            args: Prisma.AntecedentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AntecedentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>[]
          }
          delete: {
            args: Prisma.AntecedentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          update: {
            args: Prisma.AntecedentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          deleteMany: {
            args: Prisma.AntecedentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AntecedentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AntecedentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>[]
          }
          upsert: {
            args: Prisma.AntecedentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AntecedentPayload>
          }
          aggregate: {
            args: Prisma.AntecedentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAntecedent>
          }
          groupBy: {
            args: Prisma.AntecedentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AntecedentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AntecedentCountArgs<ExtArgs>
            result: $Utils.Optional<AntecedentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    medicalHistory?: MedicalHistoryOmit
    clinicalEntry?: ClinicalEntryOmit
    clinicalDocument?: ClinicalDocumentOmit
    antecedent?: AntecedentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MedicalHistoryCountOutputType
   */

  export type MedicalHistoryCountOutputType = {
    clinicalEntries: number
    antecedents: number
  }

  export type MedicalHistoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinicalEntries?: boolean | MedicalHistoryCountOutputTypeCountClinicalEntriesArgs
    antecedents?: boolean | MedicalHistoryCountOutputTypeCountAntecedentsArgs
  }

  // Custom InputTypes
  /**
   * MedicalHistoryCountOutputType without action
   */
  export type MedicalHistoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistoryCountOutputType
     */
    select?: MedicalHistoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedicalHistoryCountOutputType without action
   */
  export type MedicalHistoryCountOutputTypeCountClinicalEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicalEntryWhereInput
  }

  /**
   * MedicalHistoryCountOutputType without action
   */
  export type MedicalHistoryCountOutputTypeCountAntecedentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AntecedentWhereInput
  }


  /**
   * Count Type ClinicalEntryCountOutputType
   */

  export type ClinicalEntryCountOutputType = {
    clinicalDocuments: number
  }

  export type ClinicalEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinicalDocuments?: boolean | ClinicalEntryCountOutputTypeCountClinicalDocumentsArgs
  }

  // Custom InputTypes
  /**
   * ClinicalEntryCountOutputType without action
   */
  export type ClinicalEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntryCountOutputType
     */
    select?: ClinicalEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicalEntryCountOutputType without action
   */
  export type ClinicalEntryCountOutputTypeCountClinicalDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicalDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MedicalHistory
   */

  export type AggregateMedicalHistory = {
    _count: MedicalHistoryCountAggregateOutputType | null
    _avg: MedicalHistoryAvgAggregateOutputType | null
    _sum: MedicalHistorySumAggregateOutputType | null
    _min: MedicalHistoryMinAggregateOutputType | null
    _max: MedicalHistoryMaxAggregateOutputType | null
  }

  export type MedicalHistoryAvgAggregateOutputType = {
    historyId: number | null
    patientId: number | null
  }

  export type MedicalHistorySumAggregateOutputType = {
    historyId: number | null
    patientId: number | null
  }

  export type MedicalHistoryMinAggregateOutputType = {
    historyId: number | null
    patientId: number | null
    openedAt: Date | null
    status: boolean | null
  }

  export type MedicalHistoryMaxAggregateOutputType = {
    historyId: number | null
    patientId: number | null
    openedAt: Date | null
    status: boolean | null
  }

  export type MedicalHistoryCountAggregateOutputType = {
    historyId: number
    patientId: number
    openedAt: number
    status: number
    _all: number
  }


  export type MedicalHistoryAvgAggregateInputType = {
    historyId?: true
    patientId?: true
  }

  export type MedicalHistorySumAggregateInputType = {
    historyId?: true
    patientId?: true
  }

  export type MedicalHistoryMinAggregateInputType = {
    historyId?: true
    patientId?: true
    openedAt?: true
    status?: true
  }

  export type MedicalHistoryMaxAggregateInputType = {
    historyId?: true
    patientId?: true
    openedAt?: true
    status?: true
  }

  export type MedicalHistoryCountAggregateInputType = {
    historyId?: true
    patientId?: true
    openedAt?: true
    status?: true
    _all?: true
  }

  export type MedicalHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalHistory to aggregate.
     */
    where?: MedicalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalHistories to fetch.
     */
    orderBy?: MedicalHistoryOrderByWithRelationInput | MedicalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalHistories
    **/
    _count?: true | MedicalHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicalHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicalHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalHistoryMaxAggregateInputType
  }

  export type GetMedicalHistoryAggregateType<T extends MedicalHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalHistory[P]>
      : GetScalarType<T[P], AggregateMedicalHistory[P]>
  }




  export type MedicalHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalHistoryWhereInput
    orderBy?: MedicalHistoryOrderByWithAggregationInput | MedicalHistoryOrderByWithAggregationInput[]
    by: MedicalHistoryScalarFieldEnum[] | MedicalHistoryScalarFieldEnum
    having?: MedicalHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalHistoryCountAggregateInputType | true
    _avg?: MedicalHistoryAvgAggregateInputType
    _sum?: MedicalHistorySumAggregateInputType
    _min?: MedicalHistoryMinAggregateInputType
    _max?: MedicalHistoryMaxAggregateInputType
  }

  export type MedicalHistoryGroupByOutputType = {
    historyId: number
    patientId: number
    openedAt: Date
    status: boolean
    _count: MedicalHistoryCountAggregateOutputType | null
    _avg: MedicalHistoryAvgAggregateOutputType | null
    _sum: MedicalHistorySumAggregateOutputType | null
    _min: MedicalHistoryMinAggregateOutputType | null
    _max: MedicalHistoryMaxAggregateOutputType | null
  }

  type GetMedicalHistoryGroupByPayload<T extends MedicalHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalHistoryGroupByOutputType[P]>
        }
      >
    >


  export type MedicalHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    patientId?: boolean
    openedAt?: boolean
    status?: boolean
    clinicalEntries?: boolean | MedicalHistory$clinicalEntriesArgs<ExtArgs>
    antecedents?: boolean | MedicalHistory$antecedentsArgs<ExtArgs>
    _count?: boolean | MedicalHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalHistory"]>

  export type MedicalHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    patientId?: boolean
    openedAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["medicalHistory"]>

  export type MedicalHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    historyId?: boolean
    patientId?: boolean
    openedAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["medicalHistory"]>

  export type MedicalHistorySelectScalar = {
    historyId?: boolean
    patientId?: boolean
    openedAt?: boolean
    status?: boolean
  }

  export type MedicalHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"historyId" | "patientId" | "openedAt" | "status", ExtArgs["result"]["medicalHistory"]>
  export type MedicalHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinicalEntries?: boolean | MedicalHistory$clinicalEntriesArgs<ExtArgs>
    antecedents?: boolean | MedicalHistory$antecedentsArgs<ExtArgs>
    _count?: boolean | MedicalHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicalHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicalHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicalHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalHistory"
    objects: {
      clinicalEntries: Prisma.$ClinicalEntryPayload<ExtArgs>[]
      antecedents: Prisma.$AntecedentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      historyId: number
      patientId: number
      openedAt: Date
      status: boolean
    }, ExtArgs["result"]["medicalHistory"]>
    composites: {}
  }

  type MedicalHistoryGetPayload<S extends boolean | null | undefined | MedicalHistoryDefaultArgs> = $Result.GetResult<Prisma.$MedicalHistoryPayload, S>

  type MedicalHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalHistoryCountAggregateInputType | true
    }

  export interface MedicalHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalHistory'], meta: { name: 'MedicalHistory' } }
    /**
     * Find zero or one MedicalHistory that matches the filter.
     * @param {MedicalHistoryFindUniqueArgs} args - Arguments to find a MedicalHistory
     * @example
     * // Get one MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalHistoryFindUniqueArgs>(args: SelectSubset<T, MedicalHistoryFindUniqueArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalHistoryFindUniqueOrThrowArgs} args - Arguments to find a MedicalHistory
     * @example
     * // Get one MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryFindFirstArgs} args - Arguments to find a MedicalHistory
     * @example
     * // Get one MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalHistoryFindFirstArgs>(args?: SelectSubset<T, MedicalHistoryFindFirstArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryFindFirstOrThrowArgs} args - Arguments to find a MedicalHistory
     * @example
     * // Get one MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalHistories
     * const medicalHistories = await prisma.medicalHistory.findMany()
     * 
     * // Get first 10 MedicalHistories
     * const medicalHistories = await prisma.medicalHistory.findMany({ take: 10 })
     * 
     * // Only select the `historyId`
     * const medicalHistoryWithHistoryIdOnly = await prisma.medicalHistory.findMany({ select: { historyId: true } })
     * 
     */
    findMany<T extends MedicalHistoryFindManyArgs>(args?: SelectSubset<T, MedicalHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalHistory.
     * @param {MedicalHistoryCreateArgs} args - Arguments to create a MedicalHistory.
     * @example
     * // Create one MedicalHistory
     * const MedicalHistory = await prisma.medicalHistory.create({
     *   data: {
     *     // ... data to create a MedicalHistory
     *   }
     * })
     * 
     */
    create<T extends MedicalHistoryCreateArgs>(args: SelectSubset<T, MedicalHistoryCreateArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalHistories.
     * @param {MedicalHistoryCreateManyArgs} args - Arguments to create many MedicalHistories.
     * @example
     * // Create many MedicalHistories
     * const medicalHistory = await prisma.medicalHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalHistoryCreateManyArgs>(args?: SelectSubset<T, MedicalHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalHistories and returns the data saved in the database.
     * @param {MedicalHistoryCreateManyAndReturnArgs} args - Arguments to create many MedicalHistories.
     * @example
     * // Create many MedicalHistories
     * const medicalHistory = await prisma.medicalHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalHistories and only return the `historyId`
     * const medicalHistoryWithHistoryIdOnly = await prisma.medicalHistory.createManyAndReturn({
     *   select: { historyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalHistory.
     * @param {MedicalHistoryDeleteArgs} args - Arguments to delete one MedicalHistory.
     * @example
     * // Delete one MedicalHistory
     * const MedicalHistory = await prisma.medicalHistory.delete({
     *   where: {
     *     // ... filter to delete one MedicalHistory
     *   }
     * })
     * 
     */
    delete<T extends MedicalHistoryDeleteArgs>(args: SelectSubset<T, MedicalHistoryDeleteArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalHistory.
     * @param {MedicalHistoryUpdateArgs} args - Arguments to update one MedicalHistory.
     * @example
     * // Update one MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalHistoryUpdateArgs>(args: SelectSubset<T, MedicalHistoryUpdateArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalHistories.
     * @param {MedicalHistoryDeleteManyArgs} args - Arguments to filter MedicalHistories to delete.
     * @example
     * // Delete a few MedicalHistories
     * const { count } = await prisma.medicalHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalHistoryDeleteManyArgs>(args?: SelectSubset<T, MedicalHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalHistories
     * const medicalHistory = await prisma.medicalHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalHistoryUpdateManyArgs>(args: SelectSubset<T, MedicalHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalHistories and returns the data updated in the database.
     * @param {MedicalHistoryUpdateManyAndReturnArgs} args - Arguments to update many MedicalHistories.
     * @example
     * // Update many MedicalHistories
     * const medicalHistory = await prisma.medicalHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalHistories and only return the `historyId`
     * const medicalHistoryWithHistoryIdOnly = await prisma.medicalHistory.updateManyAndReturn({
     *   select: { historyId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicalHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalHistory.
     * @param {MedicalHistoryUpsertArgs} args - Arguments to update or create a MedicalHistory.
     * @example
     * // Update or create a MedicalHistory
     * const medicalHistory = await prisma.medicalHistory.upsert({
     *   create: {
     *     // ... data to create a MedicalHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalHistory we want to update
     *   }
     * })
     */
    upsert<T extends MedicalHistoryUpsertArgs>(args: SelectSubset<T, MedicalHistoryUpsertArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryCountArgs} args - Arguments to filter MedicalHistories to count.
     * @example
     * // Count the number of MedicalHistories
     * const count = await prisma.medicalHistory.count({
     *   where: {
     *     // ... the filter for the MedicalHistories we want to count
     *   }
     * })
    **/
    count<T extends MedicalHistoryCountArgs>(
      args?: Subset<T, MedicalHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicalHistoryAggregateArgs>(args: Subset<T, MedicalHistoryAggregateArgs>): Prisma.PrismaPromise<GetMedicalHistoryAggregateType<T>>

    /**
     * Group by MedicalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicalHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalHistoryGroupByArgs['orderBy'] }
        : { orderBy?: MedicalHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicalHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalHistory model
   */
  readonly fields: MedicalHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinicalEntries<T extends MedicalHistory$clinicalEntriesArgs<ExtArgs> = {}>(args?: Subset<T, MedicalHistory$clinicalEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    antecedents<T extends MedicalHistory$antecedentsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalHistory$antecedentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MedicalHistory model
   */
  interface MedicalHistoryFieldRefs {
    readonly historyId: FieldRef<"MedicalHistory", 'Int'>
    readonly patientId: FieldRef<"MedicalHistory", 'Int'>
    readonly openedAt: FieldRef<"MedicalHistory", 'DateTime'>
    readonly status: FieldRef<"MedicalHistory", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * MedicalHistory findUnique
   */
  export type MedicalHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MedicalHistory to fetch.
     */
    where: MedicalHistoryWhereUniqueInput
  }

  /**
   * MedicalHistory findUniqueOrThrow
   */
  export type MedicalHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MedicalHistory to fetch.
     */
    where: MedicalHistoryWhereUniqueInput
  }

  /**
   * MedicalHistory findFirst
   */
  export type MedicalHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MedicalHistory to fetch.
     */
    where?: MedicalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalHistories to fetch.
     */
    orderBy?: MedicalHistoryOrderByWithRelationInput | MedicalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalHistories.
     */
    cursor?: MedicalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalHistories.
     */
    distinct?: MedicalHistoryScalarFieldEnum | MedicalHistoryScalarFieldEnum[]
  }

  /**
   * MedicalHistory findFirstOrThrow
   */
  export type MedicalHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MedicalHistory to fetch.
     */
    where?: MedicalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalHistories to fetch.
     */
    orderBy?: MedicalHistoryOrderByWithRelationInput | MedicalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalHistories.
     */
    cursor?: MedicalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalHistories.
     */
    distinct?: MedicalHistoryScalarFieldEnum | MedicalHistoryScalarFieldEnum[]
  }

  /**
   * MedicalHistory findMany
   */
  export type MedicalHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MedicalHistories to fetch.
     */
    where?: MedicalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalHistories to fetch.
     */
    orderBy?: MedicalHistoryOrderByWithRelationInput | MedicalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalHistories.
     */
    cursor?: MedicalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalHistories.
     */
    skip?: number
    distinct?: MedicalHistoryScalarFieldEnum | MedicalHistoryScalarFieldEnum[]
  }

  /**
   * MedicalHistory create
   */
  export type MedicalHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalHistory.
     */
    data: XOR<MedicalHistoryCreateInput, MedicalHistoryUncheckedCreateInput>
  }

  /**
   * MedicalHistory createMany
   */
  export type MedicalHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalHistories.
     */
    data: MedicalHistoryCreateManyInput | MedicalHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalHistory createManyAndReturn
   */
  export type MedicalHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalHistories.
     */
    data: MedicalHistoryCreateManyInput | MedicalHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalHistory update
   */
  export type MedicalHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalHistory.
     */
    data: XOR<MedicalHistoryUpdateInput, MedicalHistoryUncheckedUpdateInput>
    /**
     * Choose, which MedicalHistory to update.
     */
    where: MedicalHistoryWhereUniqueInput
  }

  /**
   * MedicalHistory updateMany
   */
  export type MedicalHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalHistories.
     */
    data: XOR<MedicalHistoryUpdateManyMutationInput, MedicalHistoryUncheckedUpdateManyInput>
    /**
     * Filter which MedicalHistories to update
     */
    where?: MedicalHistoryWhereInput
    /**
     * Limit how many MedicalHistories to update.
     */
    limit?: number
  }

  /**
   * MedicalHistory updateManyAndReturn
   */
  export type MedicalHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * The data used to update MedicalHistories.
     */
    data: XOR<MedicalHistoryUpdateManyMutationInput, MedicalHistoryUncheckedUpdateManyInput>
    /**
     * Filter which MedicalHistories to update
     */
    where?: MedicalHistoryWhereInput
    /**
     * Limit how many MedicalHistories to update.
     */
    limit?: number
  }

  /**
   * MedicalHistory upsert
   */
  export type MedicalHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalHistory to update in case it exists.
     */
    where: MedicalHistoryWhereUniqueInput
    /**
     * In case the MedicalHistory found by the `where` argument doesn't exist, create a new MedicalHistory with this data.
     */
    create: XOR<MedicalHistoryCreateInput, MedicalHistoryUncheckedCreateInput>
    /**
     * In case the MedicalHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalHistoryUpdateInput, MedicalHistoryUncheckedUpdateInput>
  }

  /**
   * MedicalHistory delete
   */
  export type MedicalHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
    /**
     * Filter which MedicalHistory to delete.
     */
    where: MedicalHistoryWhereUniqueInput
  }

  /**
   * MedicalHistory deleteMany
   */
  export type MedicalHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalHistories to delete
     */
    where?: MedicalHistoryWhereInput
    /**
     * Limit how many MedicalHistories to delete.
     */
    limit?: number
  }

  /**
   * MedicalHistory.clinicalEntries
   */
  export type MedicalHistory$clinicalEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    where?: ClinicalEntryWhereInput
    orderBy?: ClinicalEntryOrderByWithRelationInput | ClinicalEntryOrderByWithRelationInput[]
    cursor?: ClinicalEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicalEntryScalarFieldEnum | ClinicalEntryScalarFieldEnum[]
  }

  /**
   * MedicalHistory.antecedents
   */
  export type MedicalHistory$antecedentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    where?: AntecedentWhereInput
    orderBy?: AntecedentOrderByWithRelationInput | AntecedentOrderByWithRelationInput[]
    cursor?: AntecedentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AntecedentScalarFieldEnum | AntecedentScalarFieldEnum[]
  }

  /**
   * MedicalHistory without action
   */
  export type MedicalHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: MedicalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: MedicalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ClinicalEntry
   */

  export type AggregateClinicalEntry = {
    _count: ClinicalEntryCountAggregateOutputType | null
    _avg: ClinicalEntryAvgAggregateOutputType | null
    _sum: ClinicalEntrySumAggregateOutputType | null
    _min: ClinicalEntryMinAggregateOutputType | null
    _max: ClinicalEntryMaxAggregateOutputType | null
  }

  export type ClinicalEntryAvgAggregateOutputType = {
    entryId: number | null
    historyId: number | null
    doctorId: number | null
  }

  export type ClinicalEntrySumAggregateOutputType = {
    entryId: number | null
    historyId: number | null
    doctorId: number | null
  }

  export type ClinicalEntryMinAggregateOutputType = {
    entryId: number | null
    historyId: number | null
    date: Date | null
    type: string | null
    reasonForVisit: string | null
    diagnosis: string | null
    notes: string | null
    doctorId: number | null
  }

  export type ClinicalEntryMaxAggregateOutputType = {
    entryId: number | null
    historyId: number | null
    date: Date | null
    type: string | null
    reasonForVisit: string | null
    diagnosis: string | null
    notes: string | null
    doctorId: number | null
  }

  export type ClinicalEntryCountAggregateOutputType = {
    entryId: number
    historyId: number
    date: number
    type: number
    reasonForVisit: number
    diagnosis: number
    notes: number
    doctorId: number
    _all: number
  }


  export type ClinicalEntryAvgAggregateInputType = {
    entryId?: true
    historyId?: true
    doctorId?: true
  }

  export type ClinicalEntrySumAggregateInputType = {
    entryId?: true
    historyId?: true
    doctorId?: true
  }

  export type ClinicalEntryMinAggregateInputType = {
    entryId?: true
    historyId?: true
    date?: true
    type?: true
    reasonForVisit?: true
    diagnosis?: true
    notes?: true
    doctorId?: true
  }

  export type ClinicalEntryMaxAggregateInputType = {
    entryId?: true
    historyId?: true
    date?: true
    type?: true
    reasonForVisit?: true
    diagnosis?: true
    notes?: true
    doctorId?: true
  }

  export type ClinicalEntryCountAggregateInputType = {
    entryId?: true
    historyId?: true
    date?: true
    type?: true
    reasonForVisit?: true
    diagnosis?: true
    notes?: true
    doctorId?: true
    _all?: true
  }

  export type ClinicalEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicalEntry to aggregate.
     */
    where?: ClinicalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalEntries to fetch.
     */
    orderBy?: ClinicalEntryOrderByWithRelationInput | ClinicalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicalEntries
    **/
    _count?: true | ClinicalEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicalEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicalEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicalEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicalEntryMaxAggregateInputType
  }

  export type GetClinicalEntryAggregateType<T extends ClinicalEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicalEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicalEntry[P]>
      : GetScalarType<T[P], AggregateClinicalEntry[P]>
  }




  export type ClinicalEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicalEntryWhereInput
    orderBy?: ClinicalEntryOrderByWithAggregationInput | ClinicalEntryOrderByWithAggregationInput[]
    by: ClinicalEntryScalarFieldEnum[] | ClinicalEntryScalarFieldEnum
    having?: ClinicalEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicalEntryCountAggregateInputType | true
    _avg?: ClinicalEntryAvgAggregateInputType
    _sum?: ClinicalEntrySumAggregateInputType
    _min?: ClinicalEntryMinAggregateInputType
    _max?: ClinicalEntryMaxAggregateInputType
  }

  export type ClinicalEntryGroupByOutputType = {
    entryId: number
    historyId: number
    date: Date
    type: string
    reasonForVisit: string
    diagnosis: string
    notes: string | null
    doctorId: number
    _count: ClinicalEntryCountAggregateOutputType | null
    _avg: ClinicalEntryAvgAggregateOutputType | null
    _sum: ClinicalEntrySumAggregateOutputType | null
    _min: ClinicalEntryMinAggregateOutputType | null
    _max: ClinicalEntryMaxAggregateOutputType | null
  }

  type GetClinicalEntryGroupByPayload<T extends ClinicalEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicalEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicalEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicalEntryGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicalEntryGroupByOutputType[P]>
        }
      >
    >


  export type ClinicalEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    historyId?: boolean
    date?: boolean
    type?: boolean
    reasonForVisit?: boolean
    diagnosis?: boolean
    notes?: boolean
    doctorId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
    clinicalDocuments?: boolean | ClinicalEntry$clinicalDocumentsArgs<ExtArgs>
    _count?: boolean | ClinicalEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalEntry"]>

  export type ClinicalEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    historyId?: boolean
    date?: boolean
    type?: boolean
    reasonForVisit?: boolean
    diagnosis?: boolean
    notes?: boolean
    doctorId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalEntry"]>

  export type ClinicalEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    historyId?: boolean
    date?: boolean
    type?: boolean
    reasonForVisit?: boolean
    diagnosis?: boolean
    notes?: boolean
    doctorId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalEntry"]>

  export type ClinicalEntrySelectScalar = {
    entryId?: boolean
    historyId?: boolean
    date?: boolean
    type?: boolean
    reasonForVisit?: boolean
    diagnosis?: boolean
    notes?: boolean
    doctorId?: boolean
  }

  export type ClinicalEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"entryId" | "historyId" | "date" | "type" | "reasonForVisit" | "diagnosis" | "notes" | "doctorId", ExtArgs["result"]["clinicalEntry"]>
  export type ClinicalEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
    clinicalDocuments?: boolean | ClinicalEntry$clinicalDocumentsArgs<ExtArgs>
    _count?: boolean | ClinicalEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicalEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }
  export type ClinicalEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }

  export type $ClinicalEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicalEntry"
    objects: {
      history: Prisma.$MedicalHistoryPayload<ExtArgs>
      clinicalDocuments: Prisma.$ClinicalDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      entryId: number
      historyId: number
      date: Date
      type: string
      reasonForVisit: string
      diagnosis: string
      notes: string | null
      doctorId: number
    }, ExtArgs["result"]["clinicalEntry"]>
    composites: {}
  }

  type ClinicalEntryGetPayload<S extends boolean | null | undefined | ClinicalEntryDefaultArgs> = $Result.GetResult<Prisma.$ClinicalEntryPayload, S>

  type ClinicalEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicalEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicalEntryCountAggregateInputType | true
    }

  export interface ClinicalEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicalEntry'], meta: { name: 'ClinicalEntry' } }
    /**
     * Find zero or one ClinicalEntry that matches the filter.
     * @param {ClinicalEntryFindUniqueArgs} args - Arguments to find a ClinicalEntry
     * @example
     * // Get one ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicalEntryFindUniqueArgs>(args: SelectSubset<T, ClinicalEntryFindUniqueArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicalEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicalEntryFindUniqueOrThrowArgs} args - Arguments to find a ClinicalEntry
     * @example
     * // Get one ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicalEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicalEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicalEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryFindFirstArgs} args - Arguments to find a ClinicalEntry
     * @example
     * // Get one ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicalEntryFindFirstArgs>(args?: SelectSubset<T, ClinicalEntryFindFirstArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicalEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryFindFirstOrThrowArgs} args - Arguments to find a ClinicalEntry
     * @example
     * // Get one ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicalEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicalEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicalEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicalEntries
     * const clinicalEntries = await prisma.clinicalEntry.findMany()
     * 
     * // Get first 10 ClinicalEntries
     * const clinicalEntries = await prisma.clinicalEntry.findMany({ take: 10 })
     * 
     * // Only select the `entryId`
     * const clinicalEntryWithEntryIdOnly = await prisma.clinicalEntry.findMany({ select: { entryId: true } })
     * 
     */
    findMany<T extends ClinicalEntryFindManyArgs>(args?: SelectSubset<T, ClinicalEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicalEntry.
     * @param {ClinicalEntryCreateArgs} args - Arguments to create a ClinicalEntry.
     * @example
     * // Create one ClinicalEntry
     * const ClinicalEntry = await prisma.clinicalEntry.create({
     *   data: {
     *     // ... data to create a ClinicalEntry
     *   }
     * })
     * 
     */
    create<T extends ClinicalEntryCreateArgs>(args: SelectSubset<T, ClinicalEntryCreateArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicalEntries.
     * @param {ClinicalEntryCreateManyArgs} args - Arguments to create many ClinicalEntries.
     * @example
     * // Create many ClinicalEntries
     * const clinicalEntry = await prisma.clinicalEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicalEntryCreateManyArgs>(args?: SelectSubset<T, ClinicalEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicalEntries and returns the data saved in the database.
     * @param {ClinicalEntryCreateManyAndReturnArgs} args - Arguments to create many ClinicalEntries.
     * @example
     * // Create many ClinicalEntries
     * const clinicalEntry = await prisma.clinicalEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicalEntries and only return the `entryId`
     * const clinicalEntryWithEntryIdOnly = await prisma.clinicalEntry.createManyAndReturn({
     *   select: { entryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicalEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicalEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicalEntry.
     * @param {ClinicalEntryDeleteArgs} args - Arguments to delete one ClinicalEntry.
     * @example
     * // Delete one ClinicalEntry
     * const ClinicalEntry = await prisma.clinicalEntry.delete({
     *   where: {
     *     // ... filter to delete one ClinicalEntry
     *   }
     * })
     * 
     */
    delete<T extends ClinicalEntryDeleteArgs>(args: SelectSubset<T, ClinicalEntryDeleteArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicalEntry.
     * @param {ClinicalEntryUpdateArgs} args - Arguments to update one ClinicalEntry.
     * @example
     * // Update one ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicalEntryUpdateArgs>(args: SelectSubset<T, ClinicalEntryUpdateArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicalEntries.
     * @param {ClinicalEntryDeleteManyArgs} args - Arguments to filter ClinicalEntries to delete.
     * @example
     * // Delete a few ClinicalEntries
     * const { count } = await prisma.clinicalEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicalEntryDeleteManyArgs>(args?: SelectSubset<T, ClinicalEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicalEntries
     * const clinicalEntry = await prisma.clinicalEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicalEntryUpdateManyArgs>(args: SelectSubset<T, ClinicalEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicalEntries and returns the data updated in the database.
     * @param {ClinicalEntryUpdateManyAndReturnArgs} args - Arguments to update many ClinicalEntries.
     * @example
     * // Update many ClinicalEntries
     * const clinicalEntry = await prisma.clinicalEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicalEntries and only return the `entryId`
     * const clinicalEntryWithEntryIdOnly = await prisma.clinicalEntry.updateManyAndReturn({
     *   select: { entryId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicalEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicalEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicalEntry.
     * @param {ClinicalEntryUpsertArgs} args - Arguments to update or create a ClinicalEntry.
     * @example
     * // Update or create a ClinicalEntry
     * const clinicalEntry = await prisma.clinicalEntry.upsert({
     *   create: {
     *     // ... data to create a ClinicalEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicalEntry we want to update
     *   }
     * })
     */
    upsert<T extends ClinicalEntryUpsertArgs>(args: SelectSubset<T, ClinicalEntryUpsertArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryCountArgs} args - Arguments to filter ClinicalEntries to count.
     * @example
     * // Count the number of ClinicalEntries
     * const count = await prisma.clinicalEntry.count({
     *   where: {
     *     // ... the filter for the ClinicalEntries we want to count
     *   }
     * })
    **/
    count<T extends ClinicalEntryCountArgs>(
      args?: Subset<T, ClinicalEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicalEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicalEntryAggregateArgs>(args: Subset<T, ClinicalEntryAggregateArgs>): Prisma.PrismaPromise<GetClinicalEntryAggregateType<T>>

    /**
     * Group by ClinicalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicalEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicalEntryGroupByArgs['orderBy'] }
        : { orderBy?: ClinicalEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicalEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicalEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicalEntry model
   */
  readonly fields: ClinicalEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicalEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicalEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends MedicalHistoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalHistoryDefaultArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinicalDocuments<T extends ClinicalEntry$clinicalDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, ClinicalEntry$clinicalDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClinicalEntry model
   */
  interface ClinicalEntryFieldRefs {
    readonly entryId: FieldRef<"ClinicalEntry", 'Int'>
    readonly historyId: FieldRef<"ClinicalEntry", 'Int'>
    readonly date: FieldRef<"ClinicalEntry", 'DateTime'>
    readonly type: FieldRef<"ClinicalEntry", 'String'>
    readonly reasonForVisit: FieldRef<"ClinicalEntry", 'String'>
    readonly diagnosis: FieldRef<"ClinicalEntry", 'String'>
    readonly notes: FieldRef<"ClinicalEntry", 'String'>
    readonly doctorId: FieldRef<"ClinicalEntry", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ClinicalEntry findUnique
   */
  export type ClinicalEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalEntry to fetch.
     */
    where: ClinicalEntryWhereUniqueInput
  }

  /**
   * ClinicalEntry findUniqueOrThrow
   */
  export type ClinicalEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalEntry to fetch.
     */
    where: ClinicalEntryWhereUniqueInput
  }

  /**
   * ClinicalEntry findFirst
   */
  export type ClinicalEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalEntry to fetch.
     */
    where?: ClinicalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalEntries to fetch.
     */
    orderBy?: ClinicalEntryOrderByWithRelationInput | ClinicalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicalEntries.
     */
    cursor?: ClinicalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicalEntries.
     */
    distinct?: ClinicalEntryScalarFieldEnum | ClinicalEntryScalarFieldEnum[]
  }

  /**
   * ClinicalEntry findFirstOrThrow
   */
  export type ClinicalEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalEntry to fetch.
     */
    where?: ClinicalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalEntries to fetch.
     */
    orderBy?: ClinicalEntryOrderByWithRelationInput | ClinicalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicalEntries.
     */
    cursor?: ClinicalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicalEntries.
     */
    distinct?: ClinicalEntryScalarFieldEnum | ClinicalEntryScalarFieldEnum[]
  }

  /**
   * ClinicalEntry findMany
   */
  export type ClinicalEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalEntries to fetch.
     */
    where?: ClinicalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalEntries to fetch.
     */
    orderBy?: ClinicalEntryOrderByWithRelationInput | ClinicalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicalEntries.
     */
    cursor?: ClinicalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalEntries.
     */
    skip?: number
    distinct?: ClinicalEntryScalarFieldEnum | ClinicalEntryScalarFieldEnum[]
  }

  /**
   * ClinicalEntry create
   */
  export type ClinicalEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicalEntry.
     */
    data: XOR<ClinicalEntryCreateInput, ClinicalEntryUncheckedCreateInput>
  }

  /**
   * ClinicalEntry createMany
   */
  export type ClinicalEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicalEntries.
     */
    data: ClinicalEntryCreateManyInput | ClinicalEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicalEntry createManyAndReturn
   */
  export type ClinicalEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicalEntries.
     */
    data: ClinicalEntryCreateManyInput | ClinicalEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicalEntry update
   */
  export type ClinicalEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicalEntry.
     */
    data: XOR<ClinicalEntryUpdateInput, ClinicalEntryUncheckedUpdateInput>
    /**
     * Choose, which ClinicalEntry to update.
     */
    where: ClinicalEntryWhereUniqueInput
  }

  /**
   * ClinicalEntry updateMany
   */
  export type ClinicalEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicalEntries.
     */
    data: XOR<ClinicalEntryUpdateManyMutationInput, ClinicalEntryUncheckedUpdateManyInput>
    /**
     * Filter which ClinicalEntries to update
     */
    where?: ClinicalEntryWhereInput
    /**
     * Limit how many ClinicalEntries to update.
     */
    limit?: number
  }

  /**
   * ClinicalEntry updateManyAndReturn
   */
  export type ClinicalEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * The data used to update ClinicalEntries.
     */
    data: XOR<ClinicalEntryUpdateManyMutationInput, ClinicalEntryUncheckedUpdateManyInput>
    /**
     * Filter which ClinicalEntries to update
     */
    where?: ClinicalEntryWhereInput
    /**
     * Limit how many ClinicalEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicalEntry upsert
   */
  export type ClinicalEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicalEntry to update in case it exists.
     */
    where: ClinicalEntryWhereUniqueInput
    /**
     * In case the ClinicalEntry found by the `where` argument doesn't exist, create a new ClinicalEntry with this data.
     */
    create: XOR<ClinicalEntryCreateInput, ClinicalEntryUncheckedCreateInput>
    /**
     * In case the ClinicalEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicalEntryUpdateInput, ClinicalEntryUncheckedUpdateInput>
  }

  /**
   * ClinicalEntry delete
   */
  export type ClinicalEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
    /**
     * Filter which ClinicalEntry to delete.
     */
    where: ClinicalEntryWhereUniqueInput
  }

  /**
   * ClinicalEntry deleteMany
   */
  export type ClinicalEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicalEntries to delete
     */
    where?: ClinicalEntryWhereInput
    /**
     * Limit how many ClinicalEntries to delete.
     */
    limit?: number
  }

  /**
   * ClinicalEntry.clinicalDocuments
   */
  export type ClinicalEntry$clinicalDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    where?: ClinicalDocumentWhereInput
    orderBy?: ClinicalDocumentOrderByWithRelationInput | ClinicalDocumentOrderByWithRelationInput[]
    cursor?: ClinicalDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicalDocumentScalarFieldEnum | ClinicalDocumentScalarFieldEnum[]
  }

  /**
   * ClinicalEntry without action
   */
  export type ClinicalEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalEntry
     */
    select?: ClinicalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalEntry
     */
    omit?: ClinicalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalEntryInclude<ExtArgs> | null
  }


  /**
   * Model ClinicalDocument
   */

  export type AggregateClinicalDocument = {
    _count: ClinicalDocumentCountAggregateOutputType | null
    _avg: ClinicalDocumentAvgAggregateOutputType | null
    _sum: ClinicalDocumentSumAggregateOutputType | null
    _min: ClinicalDocumentMinAggregateOutputType | null
    _max: ClinicalDocumentMaxAggregateOutputType | null
  }

  export type ClinicalDocumentAvgAggregateOutputType = {
    documentId: number | null
    entryId: number | null
  }

  export type ClinicalDocumentSumAggregateOutputType = {
    documentId: number | null
    entryId: number | null
  }

  export type ClinicalDocumentMinAggregateOutputType = {
    documentId: number | null
    entryId: number | null
    type: string | null
    fileUrl: string | null
  }

  export type ClinicalDocumentMaxAggregateOutputType = {
    documentId: number | null
    entryId: number | null
    type: string | null
    fileUrl: string | null
  }

  export type ClinicalDocumentCountAggregateOutputType = {
    documentId: number
    entryId: number
    type: number
    fileUrl: number
    metadata: number
    _all: number
  }


  export type ClinicalDocumentAvgAggregateInputType = {
    documentId?: true
    entryId?: true
  }

  export type ClinicalDocumentSumAggregateInputType = {
    documentId?: true
    entryId?: true
  }

  export type ClinicalDocumentMinAggregateInputType = {
    documentId?: true
    entryId?: true
    type?: true
    fileUrl?: true
  }

  export type ClinicalDocumentMaxAggregateInputType = {
    documentId?: true
    entryId?: true
    type?: true
    fileUrl?: true
  }

  export type ClinicalDocumentCountAggregateInputType = {
    documentId?: true
    entryId?: true
    type?: true
    fileUrl?: true
    metadata?: true
    _all?: true
  }

  export type ClinicalDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicalDocument to aggregate.
     */
    where?: ClinicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalDocuments to fetch.
     */
    orderBy?: ClinicalDocumentOrderByWithRelationInput | ClinicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicalDocuments
    **/
    _count?: true | ClinicalDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicalDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicalDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicalDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicalDocumentMaxAggregateInputType
  }

  export type GetClinicalDocumentAggregateType<T extends ClinicalDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicalDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicalDocument[P]>
      : GetScalarType<T[P], AggregateClinicalDocument[P]>
  }




  export type ClinicalDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicalDocumentWhereInput
    orderBy?: ClinicalDocumentOrderByWithAggregationInput | ClinicalDocumentOrderByWithAggregationInput[]
    by: ClinicalDocumentScalarFieldEnum[] | ClinicalDocumentScalarFieldEnum
    having?: ClinicalDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicalDocumentCountAggregateInputType | true
    _avg?: ClinicalDocumentAvgAggregateInputType
    _sum?: ClinicalDocumentSumAggregateInputType
    _min?: ClinicalDocumentMinAggregateInputType
    _max?: ClinicalDocumentMaxAggregateInputType
  }

  export type ClinicalDocumentGroupByOutputType = {
    documentId: number
    entryId: number
    type: string
    fileUrl: string
    metadata: JsonValue | null
    _count: ClinicalDocumentCountAggregateOutputType | null
    _avg: ClinicalDocumentAvgAggregateOutputType | null
    _sum: ClinicalDocumentSumAggregateOutputType | null
    _min: ClinicalDocumentMinAggregateOutputType | null
    _max: ClinicalDocumentMaxAggregateOutputType | null
  }

  type GetClinicalDocumentGroupByPayload<T extends ClinicalDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicalDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicalDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicalDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicalDocumentGroupByOutputType[P]>
        }
      >
    >


  export type ClinicalDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    documentId?: boolean
    entryId?: boolean
    type?: boolean
    fileUrl?: boolean
    metadata?: boolean
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalDocument"]>

  export type ClinicalDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    documentId?: boolean
    entryId?: boolean
    type?: boolean
    fileUrl?: boolean
    metadata?: boolean
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalDocument"]>

  export type ClinicalDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    documentId?: boolean
    entryId?: boolean
    type?: boolean
    fileUrl?: boolean
    metadata?: boolean
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicalDocument"]>

  export type ClinicalDocumentSelectScalar = {
    documentId?: boolean
    entryId?: boolean
    type?: boolean
    fileUrl?: boolean
    metadata?: boolean
  }

  export type ClinicalDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"documentId" | "entryId" | "type" | "fileUrl" | "metadata", ExtArgs["result"]["clinicalDocument"]>
  export type ClinicalDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }
  export type ClinicalDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }
  export type ClinicalDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | ClinicalEntryDefaultArgs<ExtArgs>
  }

  export type $ClinicalDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicalDocument"
    objects: {
      entry: Prisma.$ClinicalEntryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      documentId: number
      entryId: number
      type: string
      fileUrl: string
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["clinicalDocument"]>
    composites: {}
  }

  type ClinicalDocumentGetPayload<S extends boolean | null | undefined | ClinicalDocumentDefaultArgs> = $Result.GetResult<Prisma.$ClinicalDocumentPayload, S>

  type ClinicalDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicalDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicalDocumentCountAggregateInputType | true
    }

  export interface ClinicalDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicalDocument'], meta: { name: 'ClinicalDocument' } }
    /**
     * Find zero or one ClinicalDocument that matches the filter.
     * @param {ClinicalDocumentFindUniqueArgs} args - Arguments to find a ClinicalDocument
     * @example
     * // Get one ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicalDocumentFindUniqueArgs>(args: SelectSubset<T, ClinicalDocumentFindUniqueArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicalDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicalDocumentFindUniqueOrThrowArgs} args - Arguments to find a ClinicalDocument
     * @example
     * // Get one ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicalDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicalDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicalDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentFindFirstArgs} args - Arguments to find a ClinicalDocument
     * @example
     * // Get one ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicalDocumentFindFirstArgs>(args?: SelectSubset<T, ClinicalDocumentFindFirstArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicalDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentFindFirstOrThrowArgs} args - Arguments to find a ClinicalDocument
     * @example
     * // Get one ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicalDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicalDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicalDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicalDocuments
     * const clinicalDocuments = await prisma.clinicalDocument.findMany()
     * 
     * // Get first 10 ClinicalDocuments
     * const clinicalDocuments = await prisma.clinicalDocument.findMany({ take: 10 })
     * 
     * // Only select the `documentId`
     * const clinicalDocumentWithDocumentIdOnly = await prisma.clinicalDocument.findMany({ select: { documentId: true } })
     * 
     */
    findMany<T extends ClinicalDocumentFindManyArgs>(args?: SelectSubset<T, ClinicalDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicalDocument.
     * @param {ClinicalDocumentCreateArgs} args - Arguments to create a ClinicalDocument.
     * @example
     * // Create one ClinicalDocument
     * const ClinicalDocument = await prisma.clinicalDocument.create({
     *   data: {
     *     // ... data to create a ClinicalDocument
     *   }
     * })
     * 
     */
    create<T extends ClinicalDocumentCreateArgs>(args: SelectSubset<T, ClinicalDocumentCreateArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicalDocuments.
     * @param {ClinicalDocumentCreateManyArgs} args - Arguments to create many ClinicalDocuments.
     * @example
     * // Create many ClinicalDocuments
     * const clinicalDocument = await prisma.clinicalDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicalDocumentCreateManyArgs>(args?: SelectSubset<T, ClinicalDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicalDocuments and returns the data saved in the database.
     * @param {ClinicalDocumentCreateManyAndReturnArgs} args - Arguments to create many ClinicalDocuments.
     * @example
     * // Create many ClinicalDocuments
     * const clinicalDocument = await prisma.clinicalDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicalDocuments and only return the `documentId`
     * const clinicalDocumentWithDocumentIdOnly = await prisma.clinicalDocument.createManyAndReturn({
     *   select: { documentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicalDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicalDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicalDocument.
     * @param {ClinicalDocumentDeleteArgs} args - Arguments to delete one ClinicalDocument.
     * @example
     * // Delete one ClinicalDocument
     * const ClinicalDocument = await prisma.clinicalDocument.delete({
     *   where: {
     *     // ... filter to delete one ClinicalDocument
     *   }
     * })
     * 
     */
    delete<T extends ClinicalDocumentDeleteArgs>(args: SelectSubset<T, ClinicalDocumentDeleteArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicalDocument.
     * @param {ClinicalDocumentUpdateArgs} args - Arguments to update one ClinicalDocument.
     * @example
     * // Update one ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicalDocumentUpdateArgs>(args: SelectSubset<T, ClinicalDocumentUpdateArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicalDocuments.
     * @param {ClinicalDocumentDeleteManyArgs} args - Arguments to filter ClinicalDocuments to delete.
     * @example
     * // Delete a few ClinicalDocuments
     * const { count } = await prisma.clinicalDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicalDocumentDeleteManyArgs>(args?: SelectSubset<T, ClinicalDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicalDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicalDocuments
     * const clinicalDocument = await prisma.clinicalDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicalDocumentUpdateManyArgs>(args: SelectSubset<T, ClinicalDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicalDocuments and returns the data updated in the database.
     * @param {ClinicalDocumentUpdateManyAndReturnArgs} args - Arguments to update many ClinicalDocuments.
     * @example
     * // Update many ClinicalDocuments
     * const clinicalDocument = await prisma.clinicalDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicalDocuments and only return the `documentId`
     * const clinicalDocumentWithDocumentIdOnly = await prisma.clinicalDocument.updateManyAndReturn({
     *   select: { documentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicalDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicalDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicalDocument.
     * @param {ClinicalDocumentUpsertArgs} args - Arguments to update or create a ClinicalDocument.
     * @example
     * // Update or create a ClinicalDocument
     * const clinicalDocument = await prisma.clinicalDocument.upsert({
     *   create: {
     *     // ... data to create a ClinicalDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicalDocument we want to update
     *   }
     * })
     */
    upsert<T extends ClinicalDocumentUpsertArgs>(args: SelectSubset<T, ClinicalDocumentUpsertArgs<ExtArgs>>): Prisma__ClinicalDocumentClient<$Result.GetResult<Prisma.$ClinicalDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicalDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentCountArgs} args - Arguments to filter ClinicalDocuments to count.
     * @example
     * // Count the number of ClinicalDocuments
     * const count = await prisma.clinicalDocument.count({
     *   where: {
     *     // ... the filter for the ClinicalDocuments we want to count
     *   }
     * })
    **/
    count<T extends ClinicalDocumentCountArgs>(
      args?: Subset<T, ClinicalDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicalDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicalDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicalDocumentAggregateArgs>(args: Subset<T, ClinicalDocumentAggregateArgs>): Prisma.PrismaPromise<GetClinicalDocumentAggregateType<T>>

    /**
     * Group by ClinicalDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicalDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicalDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicalDocumentGroupByArgs['orderBy'] }
        : { orderBy?: ClinicalDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicalDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicalDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicalDocument model
   */
  readonly fields: ClinicalDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicalDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicalDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends ClinicalEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicalEntryDefaultArgs<ExtArgs>>): Prisma__ClinicalEntryClient<$Result.GetResult<Prisma.$ClinicalEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClinicalDocument model
   */
  interface ClinicalDocumentFieldRefs {
    readonly documentId: FieldRef<"ClinicalDocument", 'Int'>
    readonly entryId: FieldRef<"ClinicalDocument", 'Int'>
    readonly type: FieldRef<"ClinicalDocument", 'String'>
    readonly fileUrl: FieldRef<"ClinicalDocument", 'String'>
    readonly metadata: FieldRef<"ClinicalDocument", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ClinicalDocument findUnique
   */
  export type ClinicalDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalDocument to fetch.
     */
    where: ClinicalDocumentWhereUniqueInput
  }

  /**
   * ClinicalDocument findUniqueOrThrow
   */
  export type ClinicalDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalDocument to fetch.
     */
    where: ClinicalDocumentWhereUniqueInput
  }

  /**
   * ClinicalDocument findFirst
   */
  export type ClinicalDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalDocument to fetch.
     */
    where?: ClinicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalDocuments to fetch.
     */
    orderBy?: ClinicalDocumentOrderByWithRelationInput | ClinicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicalDocuments.
     */
    cursor?: ClinicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicalDocuments.
     */
    distinct?: ClinicalDocumentScalarFieldEnum | ClinicalDocumentScalarFieldEnum[]
  }

  /**
   * ClinicalDocument findFirstOrThrow
   */
  export type ClinicalDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalDocument to fetch.
     */
    where?: ClinicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalDocuments to fetch.
     */
    orderBy?: ClinicalDocumentOrderByWithRelationInput | ClinicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicalDocuments.
     */
    cursor?: ClinicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicalDocuments.
     */
    distinct?: ClinicalDocumentScalarFieldEnum | ClinicalDocumentScalarFieldEnum[]
  }

  /**
   * ClinicalDocument findMany
   */
  export type ClinicalDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which ClinicalDocuments to fetch.
     */
    where?: ClinicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicalDocuments to fetch.
     */
    orderBy?: ClinicalDocumentOrderByWithRelationInput | ClinicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicalDocuments.
     */
    cursor?: ClinicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicalDocuments.
     */
    skip?: number
    distinct?: ClinicalDocumentScalarFieldEnum | ClinicalDocumentScalarFieldEnum[]
  }

  /**
   * ClinicalDocument create
   */
  export type ClinicalDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicalDocument.
     */
    data: XOR<ClinicalDocumentCreateInput, ClinicalDocumentUncheckedCreateInput>
  }

  /**
   * ClinicalDocument createMany
   */
  export type ClinicalDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicalDocuments.
     */
    data: ClinicalDocumentCreateManyInput | ClinicalDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicalDocument createManyAndReturn
   */
  export type ClinicalDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicalDocuments.
     */
    data: ClinicalDocumentCreateManyInput | ClinicalDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicalDocument update
   */
  export type ClinicalDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicalDocument.
     */
    data: XOR<ClinicalDocumentUpdateInput, ClinicalDocumentUncheckedUpdateInput>
    /**
     * Choose, which ClinicalDocument to update.
     */
    where: ClinicalDocumentWhereUniqueInput
  }

  /**
   * ClinicalDocument updateMany
   */
  export type ClinicalDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicalDocuments.
     */
    data: XOR<ClinicalDocumentUpdateManyMutationInput, ClinicalDocumentUncheckedUpdateManyInput>
    /**
     * Filter which ClinicalDocuments to update
     */
    where?: ClinicalDocumentWhereInput
    /**
     * Limit how many ClinicalDocuments to update.
     */
    limit?: number
  }

  /**
   * ClinicalDocument updateManyAndReturn
   */
  export type ClinicalDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * The data used to update ClinicalDocuments.
     */
    data: XOR<ClinicalDocumentUpdateManyMutationInput, ClinicalDocumentUncheckedUpdateManyInput>
    /**
     * Filter which ClinicalDocuments to update
     */
    where?: ClinicalDocumentWhereInput
    /**
     * Limit how many ClinicalDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicalDocument upsert
   */
  export type ClinicalDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicalDocument to update in case it exists.
     */
    where: ClinicalDocumentWhereUniqueInput
    /**
     * In case the ClinicalDocument found by the `where` argument doesn't exist, create a new ClinicalDocument with this data.
     */
    create: XOR<ClinicalDocumentCreateInput, ClinicalDocumentUncheckedCreateInput>
    /**
     * In case the ClinicalDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicalDocumentUpdateInput, ClinicalDocumentUncheckedUpdateInput>
  }

  /**
   * ClinicalDocument delete
   */
  export type ClinicalDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
    /**
     * Filter which ClinicalDocument to delete.
     */
    where: ClinicalDocumentWhereUniqueInput
  }

  /**
   * ClinicalDocument deleteMany
   */
  export type ClinicalDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicalDocuments to delete
     */
    where?: ClinicalDocumentWhereInput
    /**
     * Limit how many ClinicalDocuments to delete.
     */
    limit?: number
  }

  /**
   * ClinicalDocument without action
   */
  export type ClinicalDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicalDocument
     */
    select?: ClinicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicalDocument
     */
    omit?: ClinicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicalDocumentInclude<ExtArgs> | null
  }


  /**
   * Model Antecedent
   */

  export type AggregateAntecedent = {
    _count: AntecedentCountAggregateOutputType | null
    _avg: AntecedentAvgAggregateOutputType | null
    _sum: AntecedentSumAggregateOutputType | null
    _min: AntecedentMinAggregateOutputType | null
    _max: AntecedentMaxAggregateOutputType | null
  }

  export type AntecedentAvgAggregateOutputType = {
    antecedentId: number | null
    historyId: number | null
  }

  export type AntecedentSumAggregateOutputType = {
    antecedentId: number | null
    historyId: number | null
  }

  export type AntecedentMinAggregateOutputType = {
    antecedentId: number | null
    type: string | null
    description: string | null
    historyId: number | null
  }

  export type AntecedentMaxAggregateOutputType = {
    antecedentId: number | null
    type: string | null
    description: string | null
    historyId: number | null
  }

  export type AntecedentCountAggregateOutputType = {
    antecedentId: number
    type: number
    description: number
    historyId: number
    _all: number
  }


  export type AntecedentAvgAggregateInputType = {
    antecedentId?: true
    historyId?: true
  }

  export type AntecedentSumAggregateInputType = {
    antecedentId?: true
    historyId?: true
  }

  export type AntecedentMinAggregateInputType = {
    antecedentId?: true
    type?: true
    description?: true
    historyId?: true
  }

  export type AntecedentMaxAggregateInputType = {
    antecedentId?: true
    type?: true
    description?: true
    historyId?: true
  }

  export type AntecedentCountAggregateInputType = {
    antecedentId?: true
    type?: true
    description?: true
    historyId?: true
    _all?: true
  }

  export type AntecedentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Antecedent to aggregate.
     */
    where?: AntecedentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Antecedents to fetch.
     */
    orderBy?: AntecedentOrderByWithRelationInput | AntecedentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AntecedentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Antecedents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Antecedents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Antecedents
    **/
    _count?: true | AntecedentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AntecedentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AntecedentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AntecedentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AntecedentMaxAggregateInputType
  }

  export type GetAntecedentAggregateType<T extends AntecedentAggregateArgs> = {
        [P in keyof T & keyof AggregateAntecedent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAntecedent[P]>
      : GetScalarType<T[P], AggregateAntecedent[P]>
  }




  export type AntecedentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AntecedentWhereInput
    orderBy?: AntecedentOrderByWithAggregationInput | AntecedentOrderByWithAggregationInput[]
    by: AntecedentScalarFieldEnum[] | AntecedentScalarFieldEnum
    having?: AntecedentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AntecedentCountAggregateInputType | true
    _avg?: AntecedentAvgAggregateInputType
    _sum?: AntecedentSumAggregateInputType
    _min?: AntecedentMinAggregateInputType
    _max?: AntecedentMaxAggregateInputType
  }

  export type AntecedentGroupByOutputType = {
    antecedentId: number
    type: string
    description: string
    historyId: number
    _count: AntecedentCountAggregateOutputType | null
    _avg: AntecedentAvgAggregateOutputType | null
    _sum: AntecedentSumAggregateOutputType | null
    _min: AntecedentMinAggregateOutputType | null
    _max: AntecedentMaxAggregateOutputType | null
  }

  type GetAntecedentGroupByPayload<T extends AntecedentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AntecedentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AntecedentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AntecedentGroupByOutputType[P]>
            : GetScalarType<T[P], AntecedentGroupByOutputType[P]>
        }
      >
    >


  export type AntecedentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    antecedentId?: boolean
    type?: boolean
    description?: boolean
    historyId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antecedent"]>

  export type AntecedentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    antecedentId?: boolean
    type?: boolean
    description?: boolean
    historyId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antecedent"]>

  export type AntecedentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    antecedentId?: boolean
    type?: boolean
    description?: boolean
    historyId?: boolean
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["antecedent"]>

  export type AntecedentSelectScalar = {
    antecedentId?: boolean
    type?: boolean
    description?: boolean
    historyId?: boolean
  }

  export type AntecedentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"antecedentId" | "type" | "description" | "historyId", ExtArgs["result"]["antecedent"]>
  export type AntecedentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }
  export type AntecedentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }
  export type AntecedentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | MedicalHistoryDefaultArgs<ExtArgs>
  }

  export type $AntecedentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Antecedent"
    objects: {
      history: Prisma.$MedicalHistoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      antecedentId: number
      type: string
      description: string
      historyId: number
    }, ExtArgs["result"]["antecedent"]>
    composites: {}
  }

  type AntecedentGetPayload<S extends boolean | null | undefined | AntecedentDefaultArgs> = $Result.GetResult<Prisma.$AntecedentPayload, S>

  type AntecedentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AntecedentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AntecedentCountAggregateInputType | true
    }

  export interface AntecedentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Antecedent'], meta: { name: 'Antecedent' } }
    /**
     * Find zero or one Antecedent that matches the filter.
     * @param {AntecedentFindUniqueArgs} args - Arguments to find a Antecedent
     * @example
     * // Get one Antecedent
     * const antecedent = await prisma.antecedent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AntecedentFindUniqueArgs>(args: SelectSubset<T, AntecedentFindUniqueArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Antecedent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AntecedentFindUniqueOrThrowArgs} args - Arguments to find a Antecedent
     * @example
     * // Get one Antecedent
     * const antecedent = await prisma.antecedent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AntecedentFindUniqueOrThrowArgs>(args: SelectSubset<T, AntecedentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Antecedent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentFindFirstArgs} args - Arguments to find a Antecedent
     * @example
     * // Get one Antecedent
     * const antecedent = await prisma.antecedent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AntecedentFindFirstArgs>(args?: SelectSubset<T, AntecedentFindFirstArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Antecedent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentFindFirstOrThrowArgs} args - Arguments to find a Antecedent
     * @example
     * // Get one Antecedent
     * const antecedent = await prisma.antecedent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AntecedentFindFirstOrThrowArgs>(args?: SelectSubset<T, AntecedentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Antecedents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Antecedents
     * const antecedents = await prisma.antecedent.findMany()
     * 
     * // Get first 10 Antecedents
     * const antecedents = await prisma.antecedent.findMany({ take: 10 })
     * 
     * // Only select the `antecedentId`
     * const antecedentWithAntecedentIdOnly = await prisma.antecedent.findMany({ select: { antecedentId: true } })
     * 
     */
    findMany<T extends AntecedentFindManyArgs>(args?: SelectSubset<T, AntecedentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Antecedent.
     * @param {AntecedentCreateArgs} args - Arguments to create a Antecedent.
     * @example
     * // Create one Antecedent
     * const Antecedent = await prisma.antecedent.create({
     *   data: {
     *     // ... data to create a Antecedent
     *   }
     * })
     * 
     */
    create<T extends AntecedentCreateArgs>(args: SelectSubset<T, AntecedentCreateArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Antecedents.
     * @param {AntecedentCreateManyArgs} args - Arguments to create many Antecedents.
     * @example
     * // Create many Antecedents
     * const antecedent = await prisma.antecedent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AntecedentCreateManyArgs>(args?: SelectSubset<T, AntecedentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Antecedents and returns the data saved in the database.
     * @param {AntecedentCreateManyAndReturnArgs} args - Arguments to create many Antecedents.
     * @example
     * // Create many Antecedents
     * const antecedent = await prisma.antecedent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Antecedents and only return the `antecedentId`
     * const antecedentWithAntecedentIdOnly = await prisma.antecedent.createManyAndReturn({
     *   select: { antecedentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AntecedentCreateManyAndReturnArgs>(args?: SelectSubset<T, AntecedentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Antecedent.
     * @param {AntecedentDeleteArgs} args - Arguments to delete one Antecedent.
     * @example
     * // Delete one Antecedent
     * const Antecedent = await prisma.antecedent.delete({
     *   where: {
     *     // ... filter to delete one Antecedent
     *   }
     * })
     * 
     */
    delete<T extends AntecedentDeleteArgs>(args: SelectSubset<T, AntecedentDeleteArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Antecedent.
     * @param {AntecedentUpdateArgs} args - Arguments to update one Antecedent.
     * @example
     * // Update one Antecedent
     * const antecedent = await prisma.antecedent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AntecedentUpdateArgs>(args: SelectSubset<T, AntecedentUpdateArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Antecedents.
     * @param {AntecedentDeleteManyArgs} args - Arguments to filter Antecedents to delete.
     * @example
     * // Delete a few Antecedents
     * const { count } = await prisma.antecedent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AntecedentDeleteManyArgs>(args?: SelectSubset<T, AntecedentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Antecedents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Antecedents
     * const antecedent = await prisma.antecedent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AntecedentUpdateManyArgs>(args: SelectSubset<T, AntecedentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Antecedents and returns the data updated in the database.
     * @param {AntecedentUpdateManyAndReturnArgs} args - Arguments to update many Antecedents.
     * @example
     * // Update many Antecedents
     * const antecedent = await prisma.antecedent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Antecedents and only return the `antecedentId`
     * const antecedentWithAntecedentIdOnly = await prisma.antecedent.updateManyAndReturn({
     *   select: { antecedentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AntecedentUpdateManyAndReturnArgs>(args: SelectSubset<T, AntecedentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Antecedent.
     * @param {AntecedentUpsertArgs} args - Arguments to update or create a Antecedent.
     * @example
     * // Update or create a Antecedent
     * const antecedent = await prisma.antecedent.upsert({
     *   create: {
     *     // ... data to create a Antecedent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Antecedent we want to update
     *   }
     * })
     */
    upsert<T extends AntecedentUpsertArgs>(args: SelectSubset<T, AntecedentUpsertArgs<ExtArgs>>): Prisma__AntecedentClient<$Result.GetResult<Prisma.$AntecedentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Antecedents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentCountArgs} args - Arguments to filter Antecedents to count.
     * @example
     * // Count the number of Antecedents
     * const count = await prisma.antecedent.count({
     *   where: {
     *     // ... the filter for the Antecedents we want to count
     *   }
     * })
    **/
    count<T extends AntecedentCountArgs>(
      args?: Subset<T, AntecedentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AntecedentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Antecedent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AntecedentAggregateArgs>(args: Subset<T, AntecedentAggregateArgs>): Prisma.PrismaPromise<GetAntecedentAggregateType<T>>

    /**
     * Group by Antecedent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AntecedentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AntecedentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AntecedentGroupByArgs['orderBy'] }
        : { orderBy?: AntecedentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AntecedentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAntecedentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Antecedent model
   */
  readonly fields: AntecedentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Antecedent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AntecedentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends MedicalHistoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalHistoryDefaultArgs<ExtArgs>>): Prisma__MedicalHistoryClient<$Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Antecedent model
   */
  interface AntecedentFieldRefs {
    readonly antecedentId: FieldRef<"Antecedent", 'Int'>
    readonly type: FieldRef<"Antecedent", 'String'>
    readonly description: FieldRef<"Antecedent", 'String'>
    readonly historyId: FieldRef<"Antecedent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Antecedent findUnique
   */
  export type AntecedentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter, which Antecedent to fetch.
     */
    where: AntecedentWhereUniqueInput
  }

  /**
   * Antecedent findUniqueOrThrow
   */
  export type AntecedentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter, which Antecedent to fetch.
     */
    where: AntecedentWhereUniqueInput
  }

  /**
   * Antecedent findFirst
   */
  export type AntecedentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter, which Antecedent to fetch.
     */
    where?: AntecedentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Antecedents to fetch.
     */
    orderBy?: AntecedentOrderByWithRelationInput | AntecedentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Antecedents.
     */
    cursor?: AntecedentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Antecedents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Antecedents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Antecedents.
     */
    distinct?: AntecedentScalarFieldEnum | AntecedentScalarFieldEnum[]
  }

  /**
   * Antecedent findFirstOrThrow
   */
  export type AntecedentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter, which Antecedent to fetch.
     */
    where?: AntecedentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Antecedents to fetch.
     */
    orderBy?: AntecedentOrderByWithRelationInput | AntecedentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Antecedents.
     */
    cursor?: AntecedentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Antecedents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Antecedents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Antecedents.
     */
    distinct?: AntecedentScalarFieldEnum | AntecedentScalarFieldEnum[]
  }

  /**
   * Antecedent findMany
   */
  export type AntecedentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter, which Antecedents to fetch.
     */
    where?: AntecedentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Antecedents to fetch.
     */
    orderBy?: AntecedentOrderByWithRelationInput | AntecedentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Antecedents.
     */
    cursor?: AntecedentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Antecedents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Antecedents.
     */
    skip?: number
    distinct?: AntecedentScalarFieldEnum | AntecedentScalarFieldEnum[]
  }

  /**
   * Antecedent create
   */
  export type AntecedentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * The data needed to create a Antecedent.
     */
    data: XOR<AntecedentCreateInput, AntecedentUncheckedCreateInput>
  }

  /**
   * Antecedent createMany
   */
  export type AntecedentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Antecedents.
     */
    data: AntecedentCreateManyInput | AntecedentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Antecedent createManyAndReturn
   */
  export type AntecedentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * The data used to create many Antecedents.
     */
    data: AntecedentCreateManyInput | AntecedentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Antecedent update
   */
  export type AntecedentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * The data needed to update a Antecedent.
     */
    data: XOR<AntecedentUpdateInput, AntecedentUncheckedUpdateInput>
    /**
     * Choose, which Antecedent to update.
     */
    where: AntecedentWhereUniqueInput
  }

  /**
   * Antecedent updateMany
   */
  export type AntecedentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Antecedents.
     */
    data: XOR<AntecedentUpdateManyMutationInput, AntecedentUncheckedUpdateManyInput>
    /**
     * Filter which Antecedents to update
     */
    where?: AntecedentWhereInput
    /**
     * Limit how many Antecedents to update.
     */
    limit?: number
  }

  /**
   * Antecedent updateManyAndReturn
   */
  export type AntecedentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * The data used to update Antecedents.
     */
    data: XOR<AntecedentUpdateManyMutationInput, AntecedentUncheckedUpdateManyInput>
    /**
     * Filter which Antecedents to update
     */
    where?: AntecedentWhereInput
    /**
     * Limit how many Antecedents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Antecedent upsert
   */
  export type AntecedentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * The filter to search for the Antecedent to update in case it exists.
     */
    where: AntecedentWhereUniqueInput
    /**
     * In case the Antecedent found by the `where` argument doesn't exist, create a new Antecedent with this data.
     */
    create: XOR<AntecedentCreateInput, AntecedentUncheckedCreateInput>
    /**
     * In case the Antecedent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AntecedentUpdateInput, AntecedentUncheckedUpdateInput>
  }

  /**
   * Antecedent delete
   */
  export type AntecedentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
    /**
     * Filter which Antecedent to delete.
     */
    where: AntecedentWhereUniqueInput
  }

  /**
   * Antecedent deleteMany
   */
  export type AntecedentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Antecedents to delete
     */
    where?: AntecedentWhereInput
    /**
     * Limit how many Antecedents to delete.
     */
    limit?: number
  }

  /**
   * Antecedent without action
   */
  export type AntecedentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Antecedent
     */
    select?: AntecedentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Antecedent
     */
    omit?: AntecedentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AntecedentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MedicalHistoryScalarFieldEnum: {
    historyId: 'historyId',
    patientId: 'patientId',
    openedAt: 'openedAt',
    status: 'status'
  };

  export type MedicalHistoryScalarFieldEnum = (typeof MedicalHistoryScalarFieldEnum)[keyof typeof MedicalHistoryScalarFieldEnum]


  export const ClinicalEntryScalarFieldEnum: {
    entryId: 'entryId',
    historyId: 'historyId',
    date: 'date',
    type: 'type',
    reasonForVisit: 'reasonForVisit',
    diagnosis: 'diagnosis',
    notes: 'notes',
    doctorId: 'doctorId'
  };

  export type ClinicalEntryScalarFieldEnum = (typeof ClinicalEntryScalarFieldEnum)[keyof typeof ClinicalEntryScalarFieldEnum]


  export const ClinicalDocumentScalarFieldEnum: {
    documentId: 'documentId',
    entryId: 'entryId',
    type: 'type',
    fileUrl: 'fileUrl',
    metadata: 'metadata'
  };

  export type ClinicalDocumentScalarFieldEnum = (typeof ClinicalDocumentScalarFieldEnum)[keyof typeof ClinicalDocumentScalarFieldEnum]


  export const AntecedentScalarFieldEnum: {
    antecedentId: 'antecedentId',
    type: 'type',
    description: 'description',
    historyId: 'historyId'
  };

  export type AntecedentScalarFieldEnum = (typeof AntecedentScalarFieldEnum)[keyof typeof AntecedentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MedicalHistoryWhereInput = {
    AND?: MedicalHistoryWhereInput | MedicalHistoryWhereInput[]
    OR?: MedicalHistoryWhereInput[]
    NOT?: MedicalHistoryWhereInput | MedicalHistoryWhereInput[]
    historyId?: IntFilter<"MedicalHistory"> | number
    patientId?: IntFilter<"MedicalHistory"> | number
    openedAt?: DateTimeFilter<"MedicalHistory"> | Date | string
    status?: BoolFilter<"MedicalHistory"> | boolean
    clinicalEntries?: ClinicalEntryListRelationFilter
    antecedents?: AntecedentListRelationFilter
  }

  export type MedicalHistoryOrderByWithRelationInput = {
    historyId?: SortOrder
    patientId?: SortOrder
    openedAt?: SortOrder
    status?: SortOrder
    clinicalEntries?: ClinicalEntryOrderByRelationAggregateInput
    antecedents?: AntecedentOrderByRelationAggregateInput
  }

  export type MedicalHistoryWhereUniqueInput = Prisma.AtLeast<{
    historyId?: number
    patientId?: number
    AND?: MedicalHistoryWhereInput | MedicalHistoryWhereInput[]
    OR?: MedicalHistoryWhereInput[]
    NOT?: MedicalHistoryWhereInput | MedicalHistoryWhereInput[]
    openedAt?: DateTimeFilter<"MedicalHistory"> | Date | string
    status?: BoolFilter<"MedicalHistory"> | boolean
    clinicalEntries?: ClinicalEntryListRelationFilter
    antecedents?: AntecedentListRelationFilter
  }, "historyId" | "patientId">

  export type MedicalHistoryOrderByWithAggregationInput = {
    historyId?: SortOrder
    patientId?: SortOrder
    openedAt?: SortOrder
    status?: SortOrder
    _count?: MedicalHistoryCountOrderByAggregateInput
    _avg?: MedicalHistoryAvgOrderByAggregateInput
    _max?: MedicalHistoryMaxOrderByAggregateInput
    _min?: MedicalHistoryMinOrderByAggregateInput
    _sum?: MedicalHistorySumOrderByAggregateInput
  }

  export type MedicalHistoryScalarWhereWithAggregatesInput = {
    AND?: MedicalHistoryScalarWhereWithAggregatesInput | MedicalHistoryScalarWhereWithAggregatesInput[]
    OR?: MedicalHistoryScalarWhereWithAggregatesInput[]
    NOT?: MedicalHistoryScalarWhereWithAggregatesInput | MedicalHistoryScalarWhereWithAggregatesInput[]
    historyId?: IntWithAggregatesFilter<"MedicalHistory"> | number
    patientId?: IntWithAggregatesFilter<"MedicalHistory"> | number
    openedAt?: DateTimeWithAggregatesFilter<"MedicalHistory"> | Date | string
    status?: BoolWithAggregatesFilter<"MedicalHistory"> | boolean
  }

  export type ClinicalEntryWhereInput = {
    AND?: ClinicalEntryWhereInput | ClinicalEntryWhereInput[]
    OR?: ClinicalEntryWhereInput[]
    NOT?: ClinicalEntryWhereInput | ClinicalEntryWhereInput[]
    entryId?: IntFilter<"ClinicalEntry"> | number
    historyId?: IntFilter<"ClinicalEntry"> | number
    date?: DateTimeFilter<"ClinicalEntry"> | Date | string
    type?: StringFilter<"ClinicalEntry"> | string
    reasonForVisit?: StringFilter<"ClinicalEntry"> | string
    diagnosis?: StringFilter<"ClinicalEntry"> | string
    notes?: StringNullableFilter<"ClinicalEntry"> | string | null
    doctorId?: IntFilter<"ClinicalEntry"> | number
    history?: XOR<MedicalHistoryScalarRelationFilter, MedicalHistoryWhereInput>
    clinicalDocuments?: ClinicalDocumentListRelationFilter
  }

  export type ClinicalEntryOrderByWithRelationInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    reasonForVisit?: SortOrder
    diagnosis?: SortOrder
    notes?: SortOrderInput | SortOrder
    doctorId?: SortOrder
    history?: MedicalHistoryOrderByWithRelationInput
    clinicalDocuments?: ClinicalDocumentOrderByRelationAggregateInput
  }

  export type ClinicalEntryWhereUniqueInput = Prisma.AtLeast<{
    entryId?: number
    AND?: ClinicalEntryWhereInput | ClinicalEntryWhereInput[]
    OR?: ClinicalEntryWhereInput[]
    NOT?: ClinicalEntryWhereInput | ClinicalEntryWhereInput[]
    historyId?: IntFilter<"ClinicalEntry"> | number
    date?: DateTimeFilter<"ClinicalEntry"> | Date | string
    type?: StringFilter<"ClinicalEntry"> | string
    reasonForVisit?: StringFilter<"ClinicalEntry"> | string
    diagnosis?: StringFilter<"ClinicalEntry"> | string
    notes?: StringNullableFilter<"ClinicalEntry"> | string | null
    doctorId?: IntFilter<"ClinicalEntry"> | number
    history?: XOR<MedicalHistoryScalarRelationFilter, MedicalHistoryWhereInput>
    clinicalDocuments?: ClinicalDocumentListRelationFilter
  }, "entryId">

  export type ClinicalEntryOrderByWithAggregationInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    reasonForVisit?: SortOrder
    diagnosis?: SortOrder
    notes?: SortOrderInput | SortOrder
    doctorId?: SortOrder
    _count?: ClinicalEntryCountOrderByAggregateInput
    _avg?: ClinicalEntryAvgOrderByAggregateInput
    _max?: ClinicalEntryMaxOrderByAggregateInput
    _min?: ClinicalEntryMinOrderByAggregateInput
    _sum?: ClinicalEntrySumOrderByAggregateInput
  }

  export type ClinicalEntryScalarWhereWithAggregatesInput = {
    AND?: ClinicalEntryScalarWhereWithAggregatesInput | ClinicalEntryScalarWhereWithAggregatesInput[]
    OR?: ClinicalEntryScalarWhereWithAggregatesInput[]
    NOT?: ClinicalEntryScalarWhereWithAggregatesInput | ClinicalEntryScalarWhereWithAggregatesInput[]
    entryId?: IntWithAggregatesFilter<"ClinicalEntry"> | number
    historyId?: IntWithAggregatesFilter<"ClinicalEntry"> | number
    date?: DateTimeWithAggregatesFilter<"ClinicalEntry"> | Date | string
    type?: StringWithAggregatesFilter<"ClinicalEntry"> | string
    reasonForVisit?: StringWithAggregatesFilter<"ClinicalEntry"> | string
    diagnosis?: StringWithAggregatesFilter<"ClinicalEntry"> | string
    notes?: StringNullableWithAggregatesFilter<"ClinicalEntry"> | string | null
    doctorId?: IntWithAggregatesFilter<"ClinicalEntry"> | number
  }

  export type ClinicalDocumentWhereInput = {
    AND?: ClinicalDocumentWhereInput | ClinicalDocumentWhereInput[]
    OR?: ClinicalDocumentWhereInput[]
    NOT?: ClinicalDocumentWhereInput | ClinicalDocumentWhereInput[]
    documentId?: IntFilter<"ClinicalDocument"> | number
    entryId?: IntFilter<"ClinicalDocument"> | number
    type?: StringFilter<"ClinicalDocument"> | string
    fileUrl?: StringFilter<"ClinicalDocument"> | string
    metadata?: JsonNullableFilter<"ClinicalDocument">
    entry?: XOR<ClinicalEntryScalarRelationFilter, ClinicalEntryWhereInput>
  }

  export type ClinicalDocumentOrderByWithRelationInput = {
    documentId?: SortOrder
    entryId?: SortOrder
    type?: SortOrder
    fileUrl?: SortOrder
    metadata?: SortOrderInput | SortOrder
    entry?: ClinicalEntryOrderByWithRelationInput
  }

  export type ClinicalDocumentWhereUniqueInput = Prisma.AtLeast<{
    documentId?: number
    AND?: ClinicalDocumentWhereInput | ClinicalDocumentWhereInput[]
    OR?: ClinicalDocumentWhereInput[]
    NOT?: ClinicalDocumentWhereInput | ClinicalDocumentWhereInput[]
    entryId?: IntFilter<"ClinicalDocument"> | number
    type?: StringFilter<"ClinicalDocument"> | string
    fileUrl?: StringFilter<"ClinicalDocument"> | string
    metadata?: JsonNullableFilter<"ClinicalDocument">
    entry?: XOR<ClinicalEntryScalarRelationFilter, ClinicalEntryWhereInput>
  }, "documentId">

  export type ClinicalDocumentOrderByWithAggregationInput = {
    documentId?: SortOrder
    entryId?: SortOrder
    type?: SortOrder
    fileUrl?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: ClinicalDocumentCountOrderByAggregateInput
    _avg?: ClinicalDocumentAvgOrderByAggregateInput
    _max?: ClinicalDocumentMaxOrderByAggregateInput
    _min?: ClinicalDocumentMinOrderByAggregateInput
    _sum?: ClinicalDocumentSumOrderByAggregateInput
  }

  export type ClinicalDocumentScalarWhereWithAggregatesInput = {
    AND?: ClinicalDocumentScalarWhereWithAggregatesInput | ClinicalDocumentScalarWhereWithAggregatesInput[]
    OR?: ClinicalDocumentScalarWhereWithAggregatesInput[]
    NOT?: ClinicalDocumentScalarWhereWithAggregatesInput | ClinicalDocumentScalarWhereWithAggregatesInput[]
    documentId?: IntWithAggregatesFilter<"ClinicalDocument"> | number
    entryId?: IntWithAggregatesFilter<"ClinicalDocument"> | number
    type?: StringWithAggregatesFilter<"ClinicalDocument"> | string
    fileUrl?: StringWithAggregatesFilter<"ClinicalDocument"> | string
    metadata?: JsonNullableWithAggregatesFilter<"ClinicalDocument">
  }

  export type AntecedentWhereInput = {
    AND?: AntecedentWhereInput | AntecedentWhereInput[]
    OR?: AntecedentWhereInput[]
    NOT?: AntecedentWhereInput | AntecedentWhereInput[]
    antecedentId?: IntFilter<"Antecedent"> | number
    type?: StringFilter<"Antecedent"> | string
    description?: StringFilter<"Antecedent"> | string
    historyId?: IntFilter<"Antecedent"> | number
    history?: XOR<MedicalHistoryScalarRelationFilter, MedicalHistoryWhereInput>
  }

  export type AntecedentOrderByWithRelationInput = {
    antecedentId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    historyId?: SortOrder
    history?: MedicalHistoryOrderByWithRelationInput
  }

  export type AntecedentWhereUniqueInput = Prisma.AtLeast<{
    antecedentId?: number
    AND?: AntecedentWhereInput | AntecedentWhereInput[]
    OR?: AntecedentWhereInput[]
    NOT?: AntecedentWhereInput | AntecedentWhereInput[]
    type?: StringFilter<"Antecedent"> | string
    description?: StringFilter<"Antecedent"> | string
    historyId?: IntFilter<"Antecedent"> | number
    history?: XOR<MedicalHistoryScalarRelationFilter, MedicalHistoryWhereInput>
  }, "antecedentId">

  export type AntecedentOrderByWithAggregationInput = {
    antecedentId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    historyId?: SortOrder
    _count?: AntecedentCountOrderByAggregateInput
    _avg?: AntecedentAvgOrderByAggregateInput
    _max?: AntecedentMaxOrderByAggregateInput
    _min?: AntecedentMinOrderByAggregateInput
    _sum?: AntecedentSumOrderByAggregateInput
  }

  export type AntecedentScalarWhereWithAggregatesInput = {
    AND?: AntecedentScalarWhereWithAggregatesInput | AntecedentScalarWhereWithAggregatesInput[]
    OR?: AntecedentScalarWhereWithAggregatesInput[]
    NOT?: AntecedentScalarWhereWithAggregatesInput | AntecedentScalarWhereWithAggregatesInput[]
    antecedentId?: IntWithAggregatesFilter<"Antecedent"> | number
    type?: StringWithAggregatesFilter<"Antecedent"> | string
    description?: StringWithAggregatesFilter<"Antecedent"> | string
    historyId?: IntWithAggregatesFilter<"Antecedent"> | number
  }

  export type MedicalHistoryCreateInput = {
    patientId: number
    openedAt: Date | string
    status: boolean
    clinicalEntries?: ClinicalEntryCreateNestedManyWithoutHistoryInput
    antecedents?: AntecedentCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryUncheckedCreateInput = {
    historyId?: number
    patientId: number
    openedAt: Date | string
    status: boolean
    clinicalEntries?: ClinicalEntryUncheckedCreateNestedManyWithoutHistoryInput
    antecedents?: AntecedentUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryUpdateInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    clinicalEntries?: ClinicalEntryUpdateManyWithoutHistoryNestedInput
    antecedents?: AntecedentUpdateManyWithoutHistoryNestedInput
  }

  export type MedicalHistoryUncheckedUpdateInput = {
    historyId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    clinicalEntries?: ClinicalEntryUncheckedUpdateManyWithoutHistoryNestedInput
    antecedents?: AntecedentUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type MedicalHistoryCreateManyInput = {
    historyId?: number
    patientId: number
    openedAt: Date | string
    status: boolean
  }

  export type MedicalHistoryUpdateManyMutationInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MedicalHistoryUncheckedUpdateManyInput = {
    historyId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClinicalEntryCreateInput = {
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
    history: MedicalHistoryCreateNestedOneWithoutClinicalEntriesInput
    clinicalDocuments?: ClinicalDocumentCreateNestedManyWithoutEntryInput
  }

  export type ClinicalEntryUncheckedCreateInput = {
    entryId?: number
    historyId: number
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
    clinicalDocuments?: ClinicalDocumentUncheckedCreateNestedManyWithoutEntryInput
  }

  export type ClinicalEntryUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
    history?: MedicalHistoryUpdateOneRequiredWithoutClinicalEntriesNestedInput
    clinicalDocuments?: ClinicalDocumentUpdateManyWithoutEntryNestedInput
  }

  export type ClinicalEntryUncheckedUpdateInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    historyId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
    clinicalDocuments?: ClinicalDocumentUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type ClinicalEntryCreateManyInput = {
    entryId?: number
    historyId: number
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
  }

  export type ClinicalEntryUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
  }

  export type ClinicalEntryUncheckedUpdateManyInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    historyId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
  }

  export type ClinicalDocumentCreateInput = {
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    entry: ClinicalEntryCreateNestedOneWithoutClinicalDocumentsInput
  }

  export type ClinicalDocumentUncheckedCreateInput = {
    documentId?: number
    entryId: number
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    entry?: ClinicalEntryUpdateOneRequiredWithoutClinicalDocumentsNestedInput
  }

  export type ClinicalDocumentUncheckedUpdateInput = {
    documentId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentCreateManyInput = {
    documentId?: number
    entryId: number
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUncheckedUpdateManyInput = {
    documentId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AntecedentCreateInput = {
    type: string
    description: string
    history: MedicalHistoryCreateNestedOneWithoutAntecedentsInput
  }

  export type AntecedentUncheckedCreateInput = {
    antecedentId?: number
    type: string
    description: string
    historyId: number
  }

  export type AntecedentUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    history?: MedicalHistoryUpdateOneRequiredWithoutAntecedentsNestedInput
  }

  export type AntecedentUncheckedUpdateInput = {
    antecedentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    historyId?: IntFieldUpdateOperationsInput | number
  }

  export type AntecedentCreateManyInput = {
    antecedentId?: number
    type: string
    description: string
    historyId: number
  }

  export type AntecedentUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AntecedentUncheckedUpdateManyInput = {
    antecedentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    historyId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ClinicalEntryListRelationFilter = {
    every?: ClinicalEntryWhereInput
    some?: ClinicalEntryWhereInput
    none?: ClinicalEntryWhereInput
  }

  export type AntecedentListRelationFilter = {
    every?: AntecedentWhereInput
    some?: AntecedentWhereInput
    none?: AntecedentWhereInput
  }

  export type ClinicalEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AntecedentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalHistoryCountOrderByAggregateInput = {
    historyId?: SortOrder
    patientId?: SortOrder
    openedAt?: SortOrder
    status?: SortOrder
  }

  export type MedicalHistoryAvgOrderByAggregateInput = {
    historyId?: SortOrder
    patientId?: SortOrder
  }

  export type MedicalHistoryMaxOrderByAggregateInput = {
    historyId?: SortOrder
    patientId?: SortOrder
    openedAt?: SortOrder
    status?: SortOrder
  }

  export type MedicalHistoryMinOrderByAggregateInput = {
    historyId?: SortOrder
    patientId?: SortOrder
    openedAt?: SortOrder
    status?: SortOrder
  }

  export type MedicalHistorySumOrderByAggregateInput = {
    historyId?: SortOrder
    patientId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type MedicalHistoryScalarRelationFilter = {
    is?: MedicalHistoryWhereInput
    isNot?: MedicalHistoryWhereInput
  }

  export type ClinicalDocumentListRelationFilter = {
    every?: ClinicalDocumentWhereInput
    some?: ClinicalDocumentWhereInput
    none?: ClinicalDocumentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClinicalDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicalEntryCountOrderByAggregateInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    reasonForVisit?: SortOrder
    diagnosis?: SortOrder
    notes?: SortOrder
    doctorId?: SortOrder
  }

  export type ClinicalEntryAvgOrderByAggregateInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    doctorId?: SortOrder
  }

  export type ClinicalEntryMaxOrderByAggregateInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    reasonForVisit?: SortOrder
    diagnosis?: SortOrder
    notes?: SortOrder
    doctorId?: SortOrder
  }

  export type ClinicalEntryMinOrderByAggregateInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    reasonForVisit?: SortOrder
    diagnosis?: SortOrder
    notes?: SortOrder
    doctorId?: SortOrder
  }

  export type ClinicalEntrySumOrderByAggregateInput = {
    entryId?: SortOrder
    historyId?: SortOrder
    doctorId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ClinicalEntryScalarRelationFilter = {
    is?: ClinicalEntryWhereInput
    isNot?: ClinicalEntryWhereInput
  }

  export type ClinicalDocumentCountOrderByAggregateInput = {
    documentId?: SortOrder
    entryId?: SortOrder
    type?: SortOrder
    fileUrl?: SortOrder
    metadata?: SortOrder
  }

  export type ClinicalDocumentAvgOrderByAggregateInput = {
    documentId?: SortOrder
    entryId?: SortOrder
  }

  export type ClinicalDocumentMaxOrderByAggregateInput = {
    documentId?: SortOrder
    entryId?: SortOrder
    type?: SortOrder
    fileUrl?: SortOrder
  }

  export type ClinicalDocumentMinOrderByAggregateInput = {
    documentId?: SortOrder
    entryId?: SortOrder
    type?: SortOrder
    fileUrl?: SortOrder
  }

  export type ClinicalDocumentSumOrderByAggregateInput = {
    documentId?: SortOrder
    entryId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type AntecedentCountOrderByAggregateInput = {
    antecedentId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    historyId?: SortOrder
  }

  export type AntecedentAvgOrderByAggregateInput = {
    antecedentId?: SortOrder
    historyId?: SortOrder
  }

  export type AntecedentMaxOrderByAggregateInput = {
    antecedentId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    historyId?: SortOrder
  }

  export type AntecedentMinOrderByAggregateInput = {
    antecedentId?: SortOrder
    type?: SortOrder
    description?: SortOrder
    historyId?: SortOrder
  }

  export type AntecedentSumOrderByAggregateInput = {
    antecedentId?: SortOrder
    historyId?: SortOrder
  }

  export type ClinicalEntryCreateNestedManyWithoutHistoryInput = {
    create?: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput> | ClinicalEntryCreateWithoutHistoryInput[] | ClinicalEntryUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutHistoryInput | ClinicalEntryCreateOrConnectWithoutHistoryInput[]
    createMany?: ClinicalEntryCreateManyHistoryInputEnvelope
    connect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
  }

  export type AntecedentCreateNestedManyWithoutHistoryInput = {
    create?: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput> | AntecedentCreateWithoutHistoryInput[] | AntecedentUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: AntecedentCreateOrConnectWithoutHistoryInput | AntecedentCreateOrConnectWithoutHistoryInput[]
    createMany?: AntecedentCreateManyHistoryInputEnvelope
    connect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
  }

  export type ClinicalEntryUncheckedCreateNestedManyWithoutHistoryInput = {
    create?: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput> | ClinicalEntryCreateWithoutHistoryInput[] | ClinicalEntryUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutHistoryInput | ClinicalEntryCreateOrConnectWithoutHistoryInput[]
    createMany?: ClinicalEntryCreateManyHistoryInputEnvelope
    connect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
  }

  export type AntecedentUncheckedCreateNestedManyWithoutHistoryInput = {
    create?: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput> | AntecedentCreateWithoutHistoryInput[] | AntecedentUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: AntecedentCreateOrConnectWithoutHistoryInput | AntecedentCreateOrConnectWithoutHistoryInput[]
    createMany?: AntecedentCreateManyHistoryInputEnvelope
    connect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ClinicalEntryUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput> | ClinicalEntryCreateWithoutHistoryInput[] | ClinicalEntryUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutHistoryInput | ClinicalEntryCreateOrConnectWithoutHistoryInput[]
    upsert?: ClinicalEntryUpsertWithWhereUniqueWithoutHistoryInput | ClinicalEntryUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: ClinicalEntryCreateManyHistoryInputEnvelope
    set?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    disconnect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    delete?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    connect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    update?: ClinicalEntryUpdateWithWhereUniqueWithoutHistoryInput | ClinicalEntryUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: ClinicalEntryUpdateManyWithWhereWithoutHistoryInput | ClinicalEntryUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: ClinicalEntryScalarWhereInput | ClinicalEntryScalarWhereInput[]
  }

  export type AntecedentUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput> | AntecedentCreateWithoutHistoryInput[] | AntecedentUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: AntecedentCreateOrConnectWithoutHistoryInput | AntecedentCreateOrConnectWithoutHistoryInput[]
    upsert?: AntecedentUpsertWithWhereUniqueWithoutHistoryInput | AntecedentUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: AntecedentCreateManyHistoryInputEnvelope
    set?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    disconnect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    delete?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    connect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    update?: AntecedentUpdateWithWhereUniqueWithoutHistoryInput | AntecedentUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: AntecedentUpdateManyWithWhereWithoutHistoryInput | AntecedentUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: AntecedentScalarWhereInput | AntecedentScalarWhereInput[]
  }

  export type ClinicalEntryUncheckedUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput> | ClinicalEntryCreateWithoutHistoryInput[] | ClinicalEntryUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutHistoryInput | ClinicalEntryCreateOrConnectWithoutHistoryInput[]
    upsert?: ClinicalEntryUpsertWithWhereUniqueWithoutHistoryInput | ClinicalEntryUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: ClinicalEntryCreateManyHistoryInputEnvelope
    set?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    disconnect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    delete?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    connect?: ClinicalEntryWhereUniqueInput | ClinicalEntryWhereUniqueInput[]
    update?: ClinicalEntryUpdateWithWhereUniqueWithoutHistoryInput | ClinicalEntryUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: ClinicalEntryUpdateManyWithWhereWithoutHistoryInput | ClinicalEntryUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: ClinicalEntryScalarWhereInput | ClinicalEntryScalarWhereInput[]
  }

  export type AntecedentUncheckedUpdateManyWithoutHistoryNestedInput = {
    create?: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput> | AntecedentCreateWithoutHistoryInput[] | AntecedentUncheckedCreateWithoutHistoryInput[]
    connectOrCreate?: AntecedentCreateOrConnectWithoutHistoryInput | AntecedentCreateOrConnectWithoutHistoryInput[]
    upsert?: AntecedentUpsertWithWhereUniqueWithoutHistoryInput | AntecedentUpsertWithWhereUniqueWithoutHistoryInput[]
    createMany?: AntecedentCreateManyHistoryInputEnvelope
    set?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    disconnect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    delete?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    connect?: AntecedentWhereUniqueInput | AntecedentWhereUniqueInput[]
    update?: AntecedentUpdateWithWhereUniqueWithoutHistoryInput | AntecedentUpdateWithWhereUniqueWithoutHistoryInput[]
    updateMany?: AntecedentUpdateManyWithWhereWithoutHistoryInput | AntecedentUpdateManyWithWhereWithoutHistoryInput[]
    deleteMany?: AntecedentScalarWhereInput | AntecedentScalarWhereInput[]
  }

  export type MedicalHistoryCreateNestedOneWithoutClinicalEntriesInput = {
    create?: XOR<MedicalHistoryCreateWithoutClinicalEntriesInput, MedicalHistoryUncheckedCreateWithoutClinicalEntriesInput>
    connectOrCreate?: MedicalHistoryCreateOrConnectWithoutClinicalEntriesInput
    connect?: MedicalHistoryWhereUniqueInput
  }

  export type ClinicalDocumentCreateNestedManyWithoutEntryInput = {
    create?: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput> | ClinicalDocumentCreateWithoutEntryInput[] | ClinicalDocumentUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: ClinicalDocumentCreateOrConnectWithoutEntryInput | ClinicalDocumentCreateOrConnectWithoutEntryInput[]
    createMany?: ClinicalDocumentCreateManyEntryInputEnvelope
    connect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
  }

  export type ClinicalDocumentUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput> | ClinicalDocumentCreateWithoutEntryInput[] | ClinicalDocumentUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: ClinicalDocumentCreateOrConnectWithoutEntryInput | ClinicalDocumentCreateOrConnectWithoutEntryInput[]
    createMany?: ClinicalDocumentCreateManyEntryInputEnvelope
    connect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MedicalHistoryUpdateOneRequiredWithoutClinicalEntriesNestedInput = {
    create?: XOR<MedicalHistoryCreateWithoutClinicalEntriesInput, MedicalHistoryUncheckedCreateWithoutClinicalEntriesInput>
    connectOrCreate?: MedicalHistoryCreateOrConnectWithoutClinicalEntriesInput
    upsert?: MedicalHistoryUpsertWithoutClinicalEntriesInput
    connect?: MedicalHistoryWhereUniqueInput
    update?: XOR<XOR<MedicalHistoryUpdateToOneWithWhereWithoutClinicalEntriesInput, MedicalHistoryUpdateWithoutClinicalEntriesInput>, MedicalHistoryUncheckedUpdateWithoutClinicalEntriesInput>
  }

  export type ClinicalDocumentUpdateManyWithoutEntryNestedInput = {
    create?: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput> | ClinicalDocumentCreateWithoutEntryInput[] | ClinicalDocumentUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: ClinicalDocumentCreateOrConnectWithoutEntryInput | ClinicalDocumentCreateOrConnectWithoutEntryInput[]
    upsert?: ClinicalDocumentUpsertWithWhereUniqueWithoutEntryInput | ClinicalDocumentUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: ClinicalDocumentCreateManyEntryInputEnvelope
    set?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    disconnect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    delete?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    connect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    update?: ClinicalDocumentUpdateWithWhereUniqueWithoutEntryInput | ClinicalDocumentUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: ClinicalDocumentUpdateManyWithWhereWithoutEntryInput | ClinicalDocumentUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: ClinicalDocumentScalarWhereInput | ClinicalDocumentScalarWhereInput[]
  }

  export type ClinicalDocumentUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput> | ClinicalDocumentCreateWithoutEntryInput[] | ClinicalDocumentUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: ClinicalDocumentCreateOrConnectWithoutEntryInput | ClinicalDocumentCreateOrConnectWithoutEntryInput[]
    upsert?: ClinicalDocumentUpsertWithWhereUniqueWithoutEntryInput | ClinicalDocumentUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: ClinicalDocumentCreateManyEntryInputEnvelope
    set?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    disconnect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    delete?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    connect?: ClinicalDocumentWhereUniqueInput | ClinicalDocumentWhereUniqueInput[]
    update?: ClinicalDocumentUpdateWithWhereUniqueWithoutEntryInput | ClinicalDocumentUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: ClinicalDocumentUpdateManyWithWhereWithoutEntryInput | ClinicalDocumentUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: ClinicalDocumentScalarWhereInput | ClinicalDocumentScalarWhereInput[]
  }

  export type ClinicalEntryCreateNestedOneWithoutClinicalDocumentsInput = {
    create?: XOR<ClinicalEntryCreateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedCreateWithoutClinicalDocumentsInput>
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutClinicalDocumentsInput
    connect?: ClinicalEntryWhereUniqueInput
  }

  export type ClinicalEntryUpdateOneRequiredWithoutClinicalDocumentsNestedInput = {
    create?: XOR<ClinicalEntryCreateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedCreateWithoutClinicalDocumentsInput>
    connectOrCreate?: ClinicalEntryCreateOrConnectWithoutClinicalDocumentsInput
    upsert?: ClinicalEntryUpsertWithoutClinicalDocumentsInput
    connect?: ClinicalEntryWhereUniqueInput
    update?: XOR<XOR<ClinicalEntryUpdateToOneWithWhereWithoutClinicalDocumentsInput, ClinicalEntryUpdateWithoutClinicalDocumentsInput>, ClinicalEntryUncheckedUpdateWithoutClinicalDocumentsInput>
  }

  export type MedicalHistoryCreateNestedOneWithoutAntecedentsInput = {
    create?: XOR<MedicalHistoryCreateWithoutAntecedentsInput, MedicalHistoryUncheckedCreateWithoutAntecedentsInput>
    connectOrCreate?: MedicalHistoryCreateOrConnectWithoutAntecedentsInput
    connect?: MedicalHistoryWhereUniqueInput
  }

  export type MedicalHistoryUpdateOneRequiredWithoutAntecedentsNestedInput = {
    create?: XOR<MedicalHistoryCreateWithoutAntecedentsInput, MedicalHistoryUncheckedCreateWithoutAntecedentsInput>
    connectOrCreate?: MedicalHistoryCreateOrConnectWithoutAntecedentsInput
    upsert?: MedicalHistoryUpsertWithoutAntecedentsInput
    connect?: MedicalHistoryWhereUniqueInput
    update?: XOR<XOR<MedicalHistoryUpdateToOneWithWhereWithoutAntecedentsInput, MedicalHistoryUpdateWithoutAntecedentsInput>, MedicalHistoryUncheckedUpdateWithoutAntecedentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ClinicalEntryCreateWithoutHistoryInput = {
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
    clinicalDocuments?: ClinicalDocumentCreateNestedManyWithoutEntryInput
  }

  export type ClinicalEntryUncheckedCreateWithoutHistoryInput = {
    entryId?: number
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
    clinicalDocuments?: ClinicalDocumentUncheckedCreateNestedManyWithoutEntryInput
  }

  export type ClinicalEntryCreateOrConnectWithoutHistoryInput = {
    where: ClinicalEntryWhereUniqueInput
    create: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput>
  }

  export type ClinicalEntryCreateManyHistoryInputEnvelope = {
    data: ClinicalEntryCreateManyHistoryInput | ClinicalEntryCreateManyHistoryInput[]
    skipDuplicates?: boolean
  }

  export type AntecedentCreateWithoutHistoryInput = {
    type: string
    description: string
  }

  export type AntecedentUncheckedCreateWithoutHistoryInput = {
    antecedentId?: number
    type: string
    description: string
  }

  export type AntecedentCreateOrConnectWithoutHistoryInput = {
    where: AntecedentWhereUniqueInput
    create: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput>
  }

  export type AntecedentCreateManyHistoryInputEnvelope = {
    data: AntecedentCreateManyHistoryInput | AntecedentCreateManyHistoryInput[]
    skipDuplicates?: boolean
  }

  export type ClinicalEntryUpsertWithWhereUniqueWithoutHistoryInput = {
    where: ClinicalEntryWhereUniqueInput
    update: XOR<ClinicalEntryUpdateWithoutHistoryInput, ClinicalEntryUncheckedUpdateWithoutHistoryInput>
    create: XOR<ClinicalEntryCreateWithoutHistoryInput, ClinicalEntryUncheckedCreateWithoutHistoryInput>
  }

  export type ClinicalEntryUpdateWithWhereUniqueWithoutHistoryInput = {
    where: ClinicalEntryWhereUniqueInput
    data: XOR<ClinicalEntryUpdateWithoutHistoryInput, ClinicalEntryUncheckedUpdateWithoutHistoryInput>
  }

  export type ClinicalEntryUpdateManyWithWhereWithoutHistoryInput = {
    where: ClinicalEntryScalarWhereInput
    data: XOR<ClinicalEntryUpdateManyMutationInput, ClinicalEntryUncheckedUpdateManyWithoutHistoryInput>
  }

  export type ClinicalEntryScalarWhereInput = {
    AND?: ClinicalEntryScalarWhereInput | ClinicalEntryScalarWhereInput[]
    OR?: ClinicalEntryScalarWhereInput[]
    NOT?: ClinicalEntryScalarWhereInput | ClinicalEntryScalarWhereInput[]
    entryId?: IntFilter<"ClinicalEntry"> | number
    historyId?: IntFilter<"ClinicalEntry"> | number
    date?: DateTimeFilter<"ClinicalEntry"> | Date | string
    type?: StringFilter<"ClinicalEntry"> | string
    reasonForVisit?: StringFilter<"ClinicalEntry"> | string
    diagnosis?: StringFilter<"ClinicalEntry"> | string
    notes?: StringNullableFilter<"ClinicalEntry"> | string | null
    doctorId?: IntFilter<"ClinicalEntry"> | number
  }

  export type AntecedentUpsertWithWhereUniqueWithoutHistoryInput = {
    where: AntecedentWhereUniqueInput
    update: XOR<AntecedentUpdateWithoutHistoryInput, AntecedentUncheckedUpdateWithoutHistoryInput>
    create: XOR<AntecedentCreateWithoutHistoryInput, AntecedentUncheckedCreateWithoutHistoryInput>
  }

  export type AntecedentUpdateWithWhereUniqueWithoutHistoryInput = {
    where: AntecedentWhereUniqueInput
    data: XOR<AntecedentUpdateWithoutHistoryInput, AntecedentUncheckedUpdateWithoutHistoryInput>
  }

  export type AntecedentUpdateManyWithWhereWithoutHistoryInput = {
    where: AntecedentScalarWhereInput
    data: XOR<AntecedentUpdateManyMutationInput, AntecedentUncheckedUpdateManyWithoutHistoryInput>
  }

  export type AntecedentScalarWhereInput = {
    AND?: AntecedentScalarWhereInput | AntecedentScalarWhereInput[]
    OR?: AntecedentScalarWhereInput[]
    NOT?: AntecedentScalarWhereInput | AntecedentScalarWhereInput[]
    antecedentId?: IntFilter<"Antecedent"> | number
    type?: StringFilter<"Antecedent"> | string
    description?: StringFilter<"Antecedent"> | string
    historyId?: IntFilter<"Antecedent"> | number
  }

  export type MedicalHistoryCreateWithoutClinicalEntriesInput = {
    patientId: number
    openedAt: Date | string
    status: boolean
    antecedents?: AntecedentCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryUncheckedCreateWithoutClinicalEntriesInput = {
    historyId?: number
    patientId: number
    openedAt: Date | string
    status: boolean
    antecedents?: AntecedentUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryCreateOrConnectWithoutClinicalEntriesInput = {
    where: MedicalHistoryWhereUniqueInput
    create: XOR<MedicalHistoryCreateWithoutClinicalEntriesInput, MedicalHistoryUncheckedCreateWithoutClinicalEntriesInput>
  }

  export type ClinicalDocumentCreateWithoutEntryInput = {
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUncheckedCreateWithoutEntryInput = {
    documentId?: number
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentCreateOrConnectWithoutEntryInput = {
    where: ClinicalDocumentWhereUniqueInput
    create: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput>
  }

  export type ClinicalDocumentCreateManyEntryInputEnvelope = {
    data: ClinicalDocumentCreateManyEntryInput | ClinicalDocumentCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type MedicalHistoryUpsertWithoutClinicalEntriesInput = {
    update: XOR<MedicalHistoryUpdateWithoutClinicalEntriesInput, MedicalHistoryUncheckedUpdateWithoutClinicalEntriesInput>
    create: XOR<MedicalHistoryCreateWithoutClinicalEntriesInput, MedicalHistoryUncheckedCreateWithoutClinicalEntriesInput>
    where?: MedicalHistoryWhereInput
  }

  export type MedicalHistoryUpdateToOneWithWhereWithoutClinicalEntriesInput = {
    where?: MedicalHistoryWhereInput
    data: XOR<MedicalHistoryUpdateWithoutClinicalEntriesInput, MedicalHistoryUncheckedUpdateWithoutClinicalEntriesInput>
  }

  export type MedicalHistoryUpdateWithoutClinicalEntriesInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    antecedents?: AntecedentUpdateManyWithoutHistoryNestedInput
  }

  export type MedicalHistoryUncheckedUpdateWithoutClinicalEntriesInput = {
    historyId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    antecedents?: AntecedentUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type ClinicalDocumentUpsertWithWhereUniqueWithoutEntryInput = {
    where: ClinicalDocumentWhereUniqueInput
    update: XOR<ClinicalDocumentUpdateWithoutEntryInput, ClinicalDocumentUncheckedUpdateWithoutEntryInput>
    create: XOR<ClinicalDocumentCreateWithoutEntryInput, ClinicalDocumentUncheckedCreateWithoutEntryInput>
  }

  export type ClinicalDocumentUpdateWithWhereUniqueWithoutEntryInput = {
    where: ClinicalDocumentWhereUniqueInput
    data: XOR<ClinicalDocumentUpdateWithoutEntryInput, ClinicalDocumentUncheckedUpdateWithoutEntryInput>
  }

  export type ClinicalDocumentUpdateManyWithWhereWithoutEntryInput = {
    where: ClinicalDocumentScalarWhereInput
    data: XOR<ClinicalDocumentUpdateManyMutationInput, ClinicalDocumentUncheckedUpdateManyWithoutEntryInput>
  }

  export type ClinicalDocumentScalarWhereInput = {
    AND?: ClinicalDocumentScalarWhereInput | ClinicalDocumentScalarWhereInput[]
    OR?: ClinicalDocumentScalarWhereInput[]
    NOT?: ClinicalDocumentScalarWhereInput | ClinicalDocumentScalarWhereInput[]
    documentId?: IntFilter<"ClinicalDocument"> | number
    entryId?: IntFilter<"ClinicalDocument"> | number
    type?: StringFilter<"ClinicalDocument"> | string
    fileUrl?: StringFilter<"ClinicalDocument"> | string
    metadata?: JsonNullableFilter<"ClinicalDocument">
  }

  export type ClinicalEntryCreateWithoutClinicalDocumentsInput = {
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
    history: MedicalHistoryCreateNestedOneWithoutClinicalEntriesInput
  }

  export type ClinicalEntryUncheckedCreateWithoutClinicalDocumentsInput = {
    entryId?: number
    historyId: number
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
  }

  export type ClinicalEntryCreateOrConnectWithoutClinicalDocumentsInput = {
    where: ClinicalEntryWhereUniqueInput
    create: XOR<ClinicalEntryCreateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedCreateWithoutClinicalDocumentsInput>
  }

  export type ClinicalEntryUpsertWithoutClinicalDocumentsInput = {
    update: XOR<ClinicalEntryUpdateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedUpdateWithoutClinicalDocumentsInput>
    create: XOR<ClinicalEntryCreateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedCreateWithoutClinicalDocumentsInput>
    where?: ClinicalEntryWhereInput
  }

  export type ClinicalEntryUpdateToOneWithWhereWithoutClinicalDocumentsInput = {
    where?: ClinicalEntryWhereInput
    data: XOR<ClinicalEntryUpdateWithoutClinicalDocumentsInput, ClinicalEntryUncheckedUpdateWithoutClinicalDocumentsInput>
  }

  export type ClinicalEntryUpdateWithoutClinicalDocumentsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
    history?: MedicalHistoryUpdateOneRequiredWithoutClinicalEntriesNestedInput
  }

  export type ClinicalEntryUncheckedUpdateWithoutClinicalDocumentsInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    historyId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
  }

  export type MedicalHistoryCreateWithoutAntecedentsInput = {
    patientId: number
    openedAt: Date | string
    status: boolean
    clinicalEntries?: ClinicalEntryCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryUncheckedCreateWithoutAntecedentsInput = {
    historyId?: number
    patientId: number
    openedAt: Date | string
    status: boolean
    clinicalEntries?: ClinicalEntryUncheckedCreateNestedManyWithoutHistoryInput
  }

  export type MedicalHistoryCreateOrConnectWithoutAntecedentsInput = {
    where: MedicalHistoryWhereUniqueInput
    create: XOR<MedicalHistoryCreateWithoutAntecedentsInput, MedicalHistoryUncheckedCreateWithoutAntecedentsInput>
  }

  export type MedicalHistoryUpsertWithoutAntecedentsInput = {
    update: XOR<MedicalHistoryUpdateWithoutAntecedentsInput, MedicalHistoryUncheckedUpdateWithoutAntecedentsInput>
    create: XOR<MedicalHistoryCreateWithoutAntecedentsInput, MedicalHistoryUncheckedCreateWithoutAntecedentsInput>
    where?: MedicalHistoryWhereInput
  }

  export type MedicalHistoryUpdateToOneWithWhereWithoutAntecedentsInput = {
    where?: MedicalHistoryWhereInput
    data: XOR<MedicalHistoryUpdateWithoutAntecedentsInput, MedicalHistoryUncheckedUpdateWithoutAntecedentsInput>
  }

  export type MedicalHistoryUpdateWithoutAntecedentsInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    clinicalEntries?: ClinicalEntryUpdateManyWithoutHistoryNestedInput
  }

  export type MedicalHistoryUncheckedUpdateWithoutAntecedentsInput = {
    historyId?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: BoolFieldUpdateOperationsInput | boolean
    clinicalEntries?: ClinicalEntryUncheckedUpdateManyWithoutHistoryNestedInput
  }

  export type ClinicalEntryCreateManyHistoryInput = {
    entryId?: number
    date: Date | string
    type: string
    reasonForVisit: string
    diagnosis: string
    notes?: string | null
    doctorId: number
  }

  export type AntecedentCreateManyHistoryInput = {
    antecedentId?: number
    type: string
    description: string
  }

  export type ClinicalEntryUpdateWithoutHistoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
    clinicalDocuments?: ClinicalDocumentUpdateManyWithoutEntryNestedInput
  }

  export type ClinicalEntryUncheckedUpdateWithoutHistoryInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
    clinicalDocuments?: ClinicalDocumentUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type ClinicalEntryUncheckedUpdateManyWithoutHistoryInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: IntFieldUpdateOperationsInput | number
  }

  export type AntecedentUpdateWithoutHistoryInput = {
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AntecedentUncheckedUpdateWithoutHistoryInput = {
    antecedentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AntecedentUncheckedUpdateManyWithoutHistoryInput = {
    antecedentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type ClinicalDocumentCreateManyEntryInput = {
    documentId?: number
    type: string
    fileUrl: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUpdateWithoutEntryInput = {
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUncheckedUpdateWithoutEntryInput = {
    documentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClinicalDocumentUncheckedUpdateManyWithoutEntryInput = {
    documentId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}