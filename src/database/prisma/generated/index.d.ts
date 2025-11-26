
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Codes
 * 
 */
export type Codes = $Result.DefaultSelection<Prisma.$CodesPayload>
/**
 * Model Parameters
 * 
 */
export type Parameters = $Result.DefaultSelection<Prisma.$ParametersPayload>
/**
 * Model Bingo
 * 
 */
export type Bingo = $Result.DefaultSelection<Prisma.$BingoPayload>
/**
 * Model BingoCardboards
 * 
 */
export type BingoCardboards = $Result.DefaultSelection<Prisma.$BingoCardboardsPayload>
/**
 * Model live_sessions
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type live_sessions = $Result.DefaultSelection<Prisma.$live_sessionsPayload>
/**
 * Model source_codes
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type source_codes = $Result.DefaultSelection<Prisma.$source_codesPayload>
/**
 * Model bingo_prizes
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type bingo_prizes = $Result.DefaultSelection<Prisma.$bingo_prizesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  OPERADOR: 'OPERADOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const OriginCodes: {
  PRODUCTO_PROMOCIONAL: 'PRODUCTO_PROMOCIONAL',
  CUPON: 'CUPON',
  DISPONIBLE: 'DISPONIBLE'
};

export type OriginCodes = (typeof OriginCodes)[keyof typeof OriginCodes]


export const UsedCodeFor: {
  BINGO: 'BINGO',
  SORTEO: 'SORTEO',
  DISPONIBLE: 'DISPONIBLE'
};

export type UsedCodeFor = (typeof UsedCodeFor)[keyof typeof UsedCodeFor]


export const OriginSession: {
  ZOOM: 'ZOOM',
  MEET: 'MEET'
};

export type OriginSession = (typeof OriginSession)[keyof typeof OriginSession]


export const BingoPrize: {
  LINEAS: 'LINEAS',
  DEFECTO: 'DEFECTO'
};

export type BingoPrize = (typeof BingoPrize)[keyof typeof BingoPrize]


export const status: {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO'
};

export type status = (typeof status)[keyof typeof status]


export const bingo_victories: {
  CARTON_LLENO: 'CARTON_LLENO',
  LINEA_SIMPLE: 'LINEA_SIMPLE',
  LINEA_DOBLE: 'LINEA_DOBLE',
  CUATRO_ESQUINAS: 'CUATRO_ESQUINAS',
  PERIMETRO: 'PERIMETRO',
  LETRA_H: 'LETRA_H',
  NUMERO_7: 'NUMERO_7',
  FLECHA: 'FLECHA'
};

export type bingo_victories = (typeof bingo_victories)[keyof typeof bingo_victories]


export const estado_victoria_75: {
  LINEA: 'LINEA',
  LINEA_SIMPLE: 'LINEA_SIMPLE',
  BINGO_CARTON: 'BINGO_CARTON',
  CUATRO_ESQUINAS: 'CUATRO_ESQUINAS',
  X: 'X',
  T: 'T',
  PERIMETRO: 'PERIMETRO',
  VENTANA: 'VENTANA',
  LINEA_EXTERIOR: 'LINEA_EXTERIOR'
};

export type estado_victoria_75 = (typeof estado_victoria_75)[keyof typeof estado_victoria_75]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type OriginCodes = $Enums.OriginCodes

export const OriginCodes: typeof $Enums.OriginCodes

export type UsedCodeFor = $Enums.UsedCodeFor

export const UsedCodeFor: typeof $Enums.UsedCodeFor

export type OriginSession = $Enums.OriginSession

export const OriginSession: typeof $Enums.OriginSession

export type BingoPrize = $Enums.BingoPrize

export const BingoPrize: typeof $Enums.BingoPrize

export type status = $Enums.status

export const status: typeof $Enums.status

export type bingo_victories = $Enums.bingo_victories

export const bingo_victories: typeof $Enums.bingo_victories

export type estado_victoria_75 = $Enums.estado_victoria_75

export const estado_victoria_75: typeof $Enums.estado_victoria_75

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.codes`: Exposes CRUD operations for the **Codes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Codes
    * const codes = await prisma.codes.findMany()
    * ```
    */
  get codes(): Prisma.CodesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parameters`: Exposes CRUD operations for the **Parameters** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parameters
    * const parameters = await prisma.parameters.findMany()
    * ```
    */
  get parameters(): Prisma.ParametersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bingo`: Exposes CRUD operations for the **Bingo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bingos
    * const bingos = await prisma.bingo.findMany()
    * ```
    */
  get bingo(): Prisma.BingoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bingoCardboards`: Exposes CRUD operations for the **BingoCardboards** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BingoCardboards
    * const bingoCardboards = await prisma.bingoCardboards.findMany()
    * ```
    */
  get bingoCardboards(): Prisma.BingoCardboardsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.live_sessions`: Exposes CRUD operations for the **live_sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Live_sessions
    * const live_sessions = await prisma.live_sessions.findMany()
    * ```
    */
  get live_sessions(): Prisma.live_sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.source_codes`: Exposes CRUD operations for the **source_codes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Source_codes
    * const source_codes = await prisma.source_codes.findMany()
    * ```
    */
  get source_codes(): Prisma.source_codesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bingo_prizes`: Exposes CRUD operations for the **bingo_prizes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bingo_prizes
    * const bingo_prizes = await prisma.bingo_prizes.findMany()
    * ```
    */
  get bingo_prizes(): Prisma.bingo_prizesDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Codes: 'Codes',
    Parameters: 'Parameters',
    Bingo: 'Bingo',
    BingoCardboards: 'BingoCardboards',
    live_sessions: 'live_sessions',
    source_codes: 'source_codes',
    bingo_prizes: 'bingo_prizes'
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
      modelProps: "user" | "codes" | "parameters" | "bingo" | "bingoCardboards" | "live_sessions" | "source_codes" | "bingo_prizes"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Codes: {
        payload: Prisma.$CodesPayload<ExtArgs>
        fields: Prisma.CodesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          findFirst: {
            args: Prisma.CodesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          findMany: {
            args: Prisma.CodesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>[]
          }
          create: {
            args: Prisma.CodesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          createMany: {
            args: Prisma.CodesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>[]
          }
          delete: {
            args: Prisma.CodesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          update: {
            args: Prisma.CodesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          deleteMany: {
            args: Prisma.CodesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>[]
          }
          upsert: {
            args: Prisma.CodesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodesPayload>
          }
          aggregate: {
            args: Prisma.CodesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodes>
          }
          groupBy: {
            args: Prisma.CodesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodesCountArgs<ExtArgs>
            result: $Utils.Optional<CodesCountAggregateOutputType> | number
          }
        }
      }
      Parameters: {
        payload: Prisma.$ParametersPayload<ExtArgs>
        fields: Prisma.ParametersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParametersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParametersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          findFirst: {
            args: Prisma.ParametersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParametersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          findMany: {
            args: Prisma.ParametersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>[]
          }
          create: {
            args: Prisma.ParametersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          createMany: {
            args: Prisma.ParametersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParametersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>[]
          }
          delete: {
            args: Prisma.ParametersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          update: {
            args: Prisma.ParametersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          deleteMany: {
            args: Prisma.ParametersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParametersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParametersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>[]
          }
          upsert: {
            args: Prisma.ParametersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParametersPayload>
          }
          aggregate: {
            args: Prisma.ParametersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParameters>
          }
          groupBy: {
            args: Prisma.ParametersGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParametersGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParametersCountArgs<ExtArgs>
            result: $Utils.Optional<ParametersCountAggregateOutputType> | number
          }
        }
      }
      Bingo: {
        payload: Prisma.$BingoPayload<ExtArgs>
        fields: Prisma.BingoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BingoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BingoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          findFirst: {
            args: Prisma.BingoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BingoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          findMany: {
            args: Prisma.BingoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>[]
          }
          create: {
            args: Prisma.BingoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          createMany: {
            args: Prisma.BingoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BingoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>[]
          }
          delete: {
            args: Prisma.BingoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          update: {
            args: Prisma.BingoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          deleteMany: {
            args: Prisma.BingoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BingoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BingoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>[]
          }
          upsert: {
            args: Prisma.BingoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoPayload>
          }
          aggregate: {
            args: Prisma.BingoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBingo>
          }
          groupBy: {
            args: Prisma.BingoGroupByArgs<ExtArgs>
            result: $Utils.Optional<BingoGroupByOutputType>[]
          }
          count: {
            args: Prisma.BingoCountArgs<ExtArgs>
            result: $Utils.Optional<BingoCountAggregateOutputType> | number
          }
        }
      }
      BingoCardboards: {
        payload: Prisma.$BingoCardboardsPayload<ExtArgs>
        fields: Prisma.BingoCardboardsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BingoCardboardsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BingoCardboardsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          findFirst: {
            args: Prisma.BingoCardboardsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BingoCardboardsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          findMany: {
            args: Prisma.BingoCardboardsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>[]
          }
          create: {
            args: Prisma.BingoCardboardsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          createMany: {
            args: Prisma.BingoCardboardsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BingoCardboardsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>[]
          }
          delete: {
            args: Prisma.BingoCardboardsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          update: {
            args: Prisma.BingoCardboardsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          deleteMany: {
            args: Prisma.BingoCardboardsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BingoCardboardsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BingoCardboardsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>[]
          }
          upsert: {
            args: Prisma.BingoCardboardsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BingoCardboardsPayload>
          }
          aggregate: {
            args: Prisma.BingoCardboardsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBingoCardboards>
          }
          groupBy: {
            args: Prisma.BingoCardboardsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BingoCardboardsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BingoCardboardsCountArgs<ExtArgs>
            result: $Utils.Optional<BingoCardboardsCountAggregateOutputType> | number
          }
        }
      }
      live_sessions: {
        payload: Prisma.$live_sessionsPayload<ExtArgs>
        fields: Prisma.live_sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.live_sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.live_sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          findFirst: {
            args: Prisma.live_sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.live_sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          findMany: {
            args: Prisma.live_sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>[]
          }
          create: {
            args: Prisma.live_sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          createMany: {
            args: Prisma.live_sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.live_sessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>[]
          }
          delete: {
            args: Prisma.live_sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          update: {
            args: Prisma.live_sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          deleteMany: {
            args: Prisma.live_sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.live_sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.live_sessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>[]
          }
          upsert: {
            args: Prisma.live_sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$live_sessionsPayload>
          }
          aggregate: {
            args: Prisma.Live_sessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLive_sessions>
          }
          groupBy: {
            args: Prisma.live_sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Live_sessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.live_sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<Live_sessionsCountAggregateOutputType> | number
          }
        }
      }
      source_codes: {
        payload: Prisma.$source_codesPayload<ExtArgs>
        fields: Prisma.source_codesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.source_codesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.source_codesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          findFirst: {
            args: Prisma.source_codesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.source_codesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          findMany: {
            args: Prisma.source_codesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>[]
          }
          create: {
            args: Prisma.source_codesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          createMany: {
            args: Prisma.source_codesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.source_codesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>[]
          }
          delete: {
            args: Prisma.source_codesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          update: {
            args: Prisma.source_codesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          deleteMany: {
            args: Prisma.source_codesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.source_codesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.source_codesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>[]
          }
          upsert: {
            args: Prisma.source_codesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$source_codesPayload>
          }
          aggregate: {
            args: Prisma.Source_codesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource_codes>
          }
          groupBy: {
            args: Prisma.source_codesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Source_codesGroupByOutputType>[]
          }
          count: {
            args: Prisma.source_codesCountArgs<ExtArgs>
            result: $Utils.Optional<Source_codesCountAggregateOutputType> | number
          }
        }
      }
      bingo_prizes: {
        payload: Prisma.$bingo_prizesPayload<ExtArgs>
        fields: Prisma.bingo_prizesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bingo_prizesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bingo_prizesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          findFirst: {
            args: Prisma.bingo_prizesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bingo_prizesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          findMany: {
            args: Prisma.bingo_prizesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>[]
          }
          create: {
            args: Prisma.bingo_prizesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          createMany: {
            args: Prisma.bingo_prizesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bingo_prizesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>[]
          }
          delete: {
            args: Prisma.bingo_prizesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          update: {
            args: Prisma.bingo_prizesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          deleteMany: {
            args: Prisma.bingo_prizesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bingo_prizesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bingo_prizesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>[]
          }
          upsert: {
            args: Prisma.bingo_prizesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bingo_prizesPayload>
          }
          aggregate: {
            args: Prisma.Bingo_prizesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBingo_prizes>
          }
          groupBy: {
            args: Prisma.bingo_prizesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bingo_prizesGroupByOutputType>[]
          }
          count: {
            args: Prisma.bingo_prizesCountArgs<ExtArgs>
            result: $Utils.Optional<Bingo_prizesCountAggregateOutputType> | number
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
    user?: UserOmit
    codes?: CodesOmit
    parameters?: ParametersOmit
    bingo?: BingoOmit
    bingoCardboards?: BingoCardboardsOmit
    live_sessions?: live_sessionsOmit
    source_codes?: source_codesOmit
    bingo_prizes?: bingo_prizesOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    BingoCardboards: number
    Codes: number
    Parameters: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | UserCountOutputTypeCountBingoCardboardsArgs
    Codes?: boolean | UserCountOutputTypeCountCodesArgs
    Parameters?: boolean | UserCountOutputTypeCountParametersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoCardboardsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParametersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParametersWhereInput
  }


  /**
   * Count Type CodesCountOutputType
   */

  export type CodesCountOutputType = {
    BingoCardboards: number
  }

  export type CodesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | CodesCountOutputTypeCountBingoCardboardsArgs
  }

  // Custom InputTypes
  /**
   * CodesCountOutputType without action
   */
  export type CodesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodesCountOutputType
     */
    select?: CodesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CodesCountOutputType without action
   */
  export type CodesCountOutputTypeCountBingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoCardboardsWhereInput
  }


  /**
   * Count Type BingoCountOutputType
   */

  export type BingoCountOutputType = {
    BingoCardboards: number
  }

  export type BingoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | BingoCountOutputTypeCountBingoCardboardsArgs
  }

  // Custom InputTypes
  /**
   * BingoCountOutputType without action
   */
  export type BingoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCountOutputType
     */
    select?: BingoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BingoCountOutputType without action
   */
  export type BingoCountOutputTypeCountBingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoCardboardsWhereInput
  }


  /**
   * Count Type Bingo_prizesCountOutputType
   */

  export type Bingo_prizesCountOutputType = {
    bingo_cardboards: number
  }

  export type Bingo_prizesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bingo_cardboards?: boolean | Bingo_prizesCountOutputTypeCountBingo_cardboardsArgs
  }

  // Custom InputTypes
  /**
   * Bingo_prizesCountOutputType without action
   */
  export type Bingo_prizesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo_prizesCountOutputType
     */
    select?: Bingo_prizesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Bingo_prizesCountOutputType without action
   */
  export type Bingo_prizesCountOutputTypeCountBingo_cardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoCardboardsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    names: string | null
    last_names: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    phone_number: string | null
    account_owner_name: string | null
    account_owner_dni: string | null
    account_number: string | null
    bank_name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    code_verification: string | null
    change_password: boolean | null
    is_verified: boolean | null
    dni: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    names: string | null
    last_names: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    phone_number: string | null
    account_owner_name: string | null
    account_owner_dni: string | null
    account_number: string | null
    bank_name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    code_verification: string | null
    change_password: boolean | null
    is_verified: boolean | null
    dni: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    names: number
    last_names: number
    email: number
    password: number
    role: number
    phone_number: number
    account_owner_name: number
    account_owner_dni: number
    account_number: number
    bank_name: number
    created_at: number
    updated_at: number
    deleted_at: number
    code_verification: number
    change_password: number
    is_verified: number
    dni: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    names?: true
    last_names?: true
    email?: true
    password?: true
    role?: true
    phone_number?: true
    account_owner_name?: true
    account_owner_dni?: true
    account_number?: true
    bank_name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    code_verification?: true
    change_password?: true
    is_verified?: true
    dni?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    names?: true
    last_names?: true
    email?: true
    password?: true
    role?: true
    phone_number?: true
    account_owner_name?: true
    account_owner_dni?: true
    account_number?: true
    bank_name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    code_verification?: true
    change_password?: true
    is_verified?: true
    dni?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    names?: true
    last_names?: true
    email?: true
    password?: true
    role?: true
    phone_number?: true
    account_owner_name?: true
    account_owner_dni?: true
    account_number?: true
    bank_name?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    code_verification?: true
    change_password?: true
    is_verified?: true
    dni?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    names: string
    last_names: string
    email: string
    password: string
    role: $Enums.Role
    phone_number: string | null
    account_owner_name: string | null
    account_owner_dni: string | null
    account_number: string | null
    bank_name: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    code_verification: string | null
    change_password: boolean | null
    is_verified: boolean | null
    dni: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    names?: boolean
    last_names?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone_number?: boolean
    account_owner_name?: boolean
    account_owner_dni?: boolean
    account_number?: boolean
    bank_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    code_verification?: boolean
    change_password?: boolean
    is_verified?: boolean
    dni?: boolean
    BingoCardboards?: boolean | User$BingoCardboardsArgs<ExtArgs>
    Codes?: boolean | User$CodesArgs<ExtArgs>
    Parameters?: boolean | User$ParametersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    names?: boolean
    last_names?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone_number?: boolean
    account_owner_name?: boolean
    account_owner_dni?: boolean
    account_number?: boolean
    bank_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    code_verification?: boolean
    change_password?: boolean
    is_verified?: boolean
    dni?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    names?: boolean
    last_names?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone_number?: boolean
    account_owner_name?: boolean
    account_owner_dni?: boolean
    account_number?: boolean
    bank_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    code_verification?: boolean
    change_password?: boolean
    is_verified?: boolean
    dni?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    names?: boolean
    last_names?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone_number?: boolean
    account_owner_name?: boolean
    account_owner_dni?: boolean
    account_number?: boolean
    bank_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    code_verification?: boolean
    change_password?: boolean
    is_verified?: boolean
    dni?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "names" | "last_names" | "email" | "password" | "role" | "phone_number" | "account_owner_name" | "account_owner_dni" | "account_number" | "bank_name" | "created_at" | "updated_at" | "deleted_at" | "code_verification" | "change_password" | "is_verified" | "dni", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | User$BingoCardboardsArgs<ExtArgs>
    Codes?: boolean | User$CodesArgs<ExtArgs>
    Parameters?: boolean | User$ParametersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      BingoCardboards: Prisma.$BingoCardboardsPayload<ExtArgs>[]
      Codes: Prisma.$CodesPayload<ExtArgs>[]
      Parameters: Prisma.$ParametersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      names: string
      last_names: string
      email: string
      password: string
      role: $Enums.Role
      phone_number: string | null
      account_owner_name: string | null
      account_owner_dni: string | null
      account_number: string | null
      bank_name: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      code_verification: string | null
      change_password: boolean | null
      is_verified: boolean | null
      dni: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    BingoCardboards<T extends User$BingoCardboardsArgs<ExtArgs> = {}>(args?: Subset<T, User$BingoCardboardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Codes<T extends User$CodesArgs<ExtArgs> = {}>(args?: Subset<T, User$CodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Parameters<T extends User$ParametersArgs<ExtArgs> = {}>(args?: Subset<T, User$ParametersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly names: FieldRef<"User", 'String'>
    readonly last_names: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly account_owner_name: FieldRef<"User", 'String'>
    readonly account_owner_dni: FieldRef<"User", 'String'>
    readonly account_number: FieldRef<"User", 'String'>
    readonly bank_name: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly deleted_at: FieldRef<"User", 'DateTime'>
    readonly code_verification: FieldRef<"User", 'String'>
    readonly change_password: FieldRef<"User", 'Boolean'>
    readonly is_verified: FieldRef<"User", 'Boolean'>
    readonly dni: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.BingoCardboards
   */
  export type User$BingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    where?: BingoCardboardsWhereInput
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    cursor?: BingoCardboardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * User.Codes
   */
  export type User$CodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    where?: CodesWhereInput
    orderBy?: CodesOrderByWithRelationInput | CodesOrderByWithRelationInput[]
    cursor?: CodesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CodesScalarFieldEnum | CodesScalarFieldEnum[]
  }

  /**
   * User.Parameters
   */
  export type User$ParametersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    where?: ParametersWhereInput
    orderBy?: ParametersOrderByWithRelationInput | ParametersOrderByWithRelationInput[]
    cursor?: ParametersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParametersScalarFieldEnum | ParametersScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Codes
   */

  export type AggregateCodes = {
    _count: CodesCountAggregateOutputType | null
    _avg: CodesAvgAggregateOutputType | null
    _sum: CodesSumAggregateOutputType | null
    _min: CodesMinAggregateOutputType | null
    _max: CodesMaxAggregateOutputType | null
  }

  export type CodesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    cost: number | null
  }

  export type CodesSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    cost: number | null
  }

  export type CodesMinAggregateOutputType = {
    id: number | null
    code: string | null
    origin: $Enums.OriginCodes | null
    used_for: $Enums.UsedCodeFor | null
    user_id: number | null
    is_used: boolean | null
    cost: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    used_date: Date | null
  }

  export type CodesMaxAggregateOutputType = {
    id: number | null
    code: string | null
    origin: $Enums.OriginCodes | null
    used_for: $Enums.UsedCodeFor | null
    user_id: number | null
    is_used: boolean | null
    cost: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    used_date: Date | null
  }

  export type CodesCountAggregateOutputType = {
    id: number
    code: number
    origin: number
    used_for: number
    user_id: number
    is_used: number
    cost: number
    created_at: number
    updated_at: number
    deleted_at: number
    used_date: number
    _all: number
  }


  export type CodesAvgAggregateInputType = {
    id?: true
    user_id?: true
    cost?: true
  }

  export type CodesSumAggregateInputType = {
    id?: true
    user_id?: true
    cost?: true
  }

  export type CodesMinAggregateInputType = {
    id?: true
    code?: true
    origin?: true
    used_for?: true
    user_id?: true
    is_used?: true
    cost?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    used_date?: true
  }

  export type CodesMaxAggregateInputType = {
    id?: true
    code?: true
    origin?: true
    used_for?: true
    user_id?: true
    is_used?: true
    cost?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    used_date?: true
  }

  export type CodesCountAggregateInputType = {
    id?: true
    code?: true
    origin?: true
    used_for?: true
    user_id?: true
    is_used?: true
    cost?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    used_date?: true
    _all?: true
  }

  export type CodesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Codes to aggregate.
     */
    where?: CodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodesOrderByWithRelationInput | CodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Codes
    **/
    _count?: true | CodesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CodesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CodesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodesMaxAggregateInputType
  }

  export type GetCodesAggregateType<T extends CodesAggregateArgs> = {
        [P in keyof T & keyof AggregateCodes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodes[P]>
      : GetScalarType<T[P], AggregateCodes[P]>
  }




  export type CodesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodesWhereInput
    orderBy?: CodesOrderByWithAggregationInput | CodesOrderByWithAggregationInput[]
    by: CodesScalarFieldEnum[] | CodesScalarFieldEnum
    having?: CodesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodesCountAggregateInputType | true
    _avg?: CodesAvgAggregateInputType
    _sum?: CodesSumAggregateInputType
    _min?: CodesMinAggregateInputType
    _max?: CodesMaxAggregateInputType
  }

  export type CodesGroupByOutputType = {
    id: number
    code: string
    origin: $Enums.OriginCodes
    used_for: $Enums.UsedCodeFor
    user_id: number
    is_used: boolean
    cost: number | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    used_date: Date | null
    _count: CodesCountAggregateOutputType | null
    _avg: CodesAvgAggregateOutputType | null
    _sum: CodesSumAggregateOutputType | null
    _min: CodesMinAggregateOutputType | null
    _max: CodesMaxAggregateOutputType | null
  }

  type GetCodesGroupByPayload<T extends CodesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodesGroupByOutputType[P]>
            : GetScalarType<T[P], CodesGroupByOutputType[P]>
        }
      >
    >


  export type CodesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    origin?: boolean
    used_for?: boolean
    user_id?: boolean
    is_used?: boolean
    cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    used_date?: boolean
    BingoCardboards?: boolean | Codes$BingoCardboardsArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CodesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codes"]>

  export type CodesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    origin?: boolean
    used_for?: boolean
    user_id?: boolean
    is_used?: boolean
    cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    used_date?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codes"]>

  export type CodesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    origin?: boolean
    used_for?: boolean
    user_id?: boolean
    is_used?: boolean
    cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    used_date?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codes"]>

  export type CodesSelectScalar = {
    id?: boolean
    code?: boolean
    origin?: boolean
    used_for?: boolean
    user_id?: boolean
    is_used?: boolean
    cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    used_date?: boolean
  }

  export type CodesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "origin" | "used_for" | "user_id" | "is_used" | "cost" | "created_at" | "updated_at" | "deleted_at" | "used_date", ExtArgs["result"]["codes"]>
  export type CodesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | Codes$BingoCardboardsArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CodesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CodesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CodesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CodesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Codes"
    objects: {
      BingoCardboards: Prisma.$BingoCardboardsPayload<ExtArgs>[]
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      origin: $Enums.OriginCodes
      used_for: $Enums.UsedCodeFor
      user_id: number
      is_used: boolean
      cost: number | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      used_date: Date | null
    }, ExtArgs["result"]["codes"]>
    composites: {}
  }

  type CodesGetPayload<S extends boolean | null | undefined | CodesDefaultArgs> = $Result.GetResult<Prisma.$CodesPayload, S>

  type CodesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodesCountAggregateInputType | true
    }

  export interface CodesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Codes'], meta: { name: 'Codes' } }
    /**
     * Find zero or one Codes that matches the filter.
     * @param {CodesFindUniqueArgs} args - Arguments to find a Codes
     * @example
     * // Get one Codes
     * const codes = await prisma.codes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodesFindUniqueArgs>(args: SelectSubset<T, CodesFindUniqueArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Codes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodesFindUniqueOrThrowArgs} args - Arguments to find a Codes
     * @example
     * // Get one Codes
     * const codes = await prisma.codes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodesFindUniqueOrThrowArgs>(args: SelectSubset<T, CodesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesFindFirstArgs} args - Arguments to find a Codes
     * @example
     * // Get one Codes
     * const codes = await prisma.codes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodesFindFirstArgs>(args?: SelectSubset<T, CodesFindFirstArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Codes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesFindFirstOrThrowArgs} args - Arguments to find a Codes
     * @example
     * // Get one Codes
     * const codes = await prisma.codes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodesFindFirstOrThrowArgs>(args?: SelectSubset<T, CodesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Codes
     * const codes = await prisma.codes.findMany()
     * 
     * // Get first 10 Codes
     * const codes = await prisma.codes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codesWithIdOnly = await prisma.codes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodesFindManyArgs>(args?: SelectSubset<T, CodesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Codes.
     * @param {CodesCreateArgs} args - Arguments to create a Codes.
     * @example
     * // Create one Codes
     * const Codes = await prisma.codes.create({
     *   data: {
     *     // ... data to create a Codes
     *   }
     * })
     * 
     */
    create<T extends CodesCreateArgs>(args: SelectSubset<T, CodesCreateArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Codes.
     * @param {CodesCreateManyArgs} args - Arguments to create many Codes.
     * @example
     * // Create many Codes
     * const codes = await prisma.codes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodesCreateManyArgs>(args?: SelectSubset<T, CodesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Codes and returns the data saved in the database.
     * @param {CodesCreateManyAndReturnArgs} args - Arguments to create many Codes.
     * @example
     * // Create many Codes
     * const codes = await prisma.codes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Codes and only return the `id`
     * const codesWithIdOnly = await prisma.codes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodesCreateManyAndReturnArgs>(args?: SelectSubset<T, CodesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Codes.
     * @param {CodesDeleteArgs} args - Arguments to delete one Codes.
     * @example
     * // Delete one Codes
     * const Codes = await prisma.codes.delete({
     *   where: {
     *     // ... filter to delete one Codes
     *   }
     * })
     * 
     */
    delete<T extends CodesDeleteArgs>(args: SelectSubset<T, CodesDeleteArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Codes.
     * @param {CodesUpdateArgs} args - Arguments to update one Codes.
     * @example
     * // Update one Codes
     * const codes = await prisma.codes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodesUpdateArgs>(args: SelectSubset<T, CodesUpdateArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Codes.
     * @param {CodesDeleteManyArgs} args - Arguments to filter Codes to delete.
     * @example
     * // Delete a few Codes
     * const { count } = await prisma.codes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodesDeleteManyArgs>(args?: SelectSubset<T, CodesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Codes
     * const codes = await prisma.codes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodesUpdateManyArgs>(args: SelectSubset<T, CodesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Codes and returns the data updated in the database.
     * @param {CodesUpdateManyAndReturnArgs} args - Arguments to update many Codes.
     * @example
     * // Update many Codes
     * const codes = await prisma.codes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Codes and only return the `id`
     * const codesWithIdOnly = await prisma.codes.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends CodesUpdateManyAndReturnArgs>(args: SelectSubset<T, CodesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Codes.
     * @param {CodesUpsertArgs} args - Arguments to update or create a Codes.
     * @example
     * // Update or create a Codes
     * const codes = await prisma.codes.upsert({
     *   create: {
     *     // ... data to create a Codes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Codes we want to update
     *   }
     * })
     */
    upsert<T extends CodesUpsertArgs>(args: SelectSubset<T, CodesUpsertArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesCountArgs} args - Arguments to filter Codes to count.
     * @example
     * // Count the number of Codes
     * const count = await prisma.codes.count({
     *   where: {
     *     // ... the filter for the Codes we want to count
     *   }
     * })
    **/
    count<T extends CodesCountArgs>(
      args?: Subset<T, CodesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CodesAggregateArgs>(args: Subset<T, CodesAggregateArgs>): Prisma.PrismaPromise<GetCodesAggregateType<T>>

    /**
     * Group by Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodesGroupByArgs} args - Group by arguments.
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
      T extends CodesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodesGroupByArgs['orderBy'] }
        : { orderBy?: CodesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CodesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Codes model
   */
  readonly fields: CodesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Codes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    BingoCardboards<T extends Codes$BingoCardboardsArgs<ExtArgs> = {}>(args?: Subset<T, Codes$BingoCardboardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Codes model
   */
  interface CodesFieldRefs {
    readonly id: FieldRef<"Codes", 'Int'>
    readonly code: FieldRef<"Codes", 'String'>
    readonly origin: FieldRef<"Codes", 'OriginCodes'>
    readonly used_for: FieldRef<"Codes", 'UsedCodeFor'>
    readonly user_id: FieldRef<"Codes", 'Int'>
    readonly is_used: FieldRef<"Codes", 'Boolean'>
    readonly cost: FieldRef<"Codes", 'Float'>
    readonly created_at: FieldRef<"Codes", 'DateTime'>
    readonly updated_at: FieldRef<"Codes", 'DateTime'>
    readonly deleted_at: FieldRef<"Codes", 'DateTime'>
    readonly used_date: FieldRef<"Codes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Codes findUnique
   */
  export type CodesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where: CodesWhereUniqueInput
  }

  /**
   * Codes findUniqueOrThrow
   */
  export type CodesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where: CodesWhereUniqueInput
  }

  /**
   * Codes findFirst
   */
  export type CodesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where?: CodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodesOrderByWithRelationInput | CodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Codes.
     */
    cursor?: CodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Codes.
     */
    distinct?: CodesScalarFieldEnum | CodesScalarFieldEnum[]
  }

  /**
   * Codes findFirstOrThrow
   */
  export type CodesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where?: CodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodesOrderByWithRelationInput | CodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Codes.
     */
    cursor?: CodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Codes.
     */
    distinct?: CodesScalarFieldEnum | CodesScalarFieldEnum[]
  }

  /**
   * Codes findMany
   */
  export type CodesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where?: CodesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodesOrderByWithRelationInput | CodesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Codes.
     */
    cursor?: CodesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    distinct?: CodesScalarFieldEnum | CodesScalarFieldEnum[]
  }

  /**
   * Codes create
   */
  export type CodesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * The data needed to create a Codes.
     */
    data: XOR<CodesCreateInput, CodesUncheckedCreateInput>
  }

  /**
   * Codes createMany
   */
  export type CodesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Codes.
     */
    data: CodesCreateManyInput | CodesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Codes createManyAndReturn
   */
  export type CodesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * The data used to create many Codes.
     */
    data: CodesCreateManyInput | CodesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Codes update
   */
  export type CodesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * The data needed to update a Codes.
     */
    data: XOR<CodesUpdateInput, CodesUncheckedUpdateInput>
    /**
     * Choose, which Codes to update.
     */
    where: CodesWhereUniqueInput
  }

  /**
   * Codes updateMany
   */
  export type CodesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Codes.
     */
    data: XOR<CodesUpdateManyMutationInput, CodesUncheckedUpdateManyInput>
    /**
     * Filter which Codes to update
     */
    where?: CodesWhereInput
    /**
     * Limit how many Codes to update.
     */
    limit?: number
  }

  /**
   * Codes updateManyAndReturn
   */
  export type CodesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * The data used to update Codes.
     */
    data: XOR<CodesUpdateManyMutationInput, CodesUncheckedUpdateManyInput>
    /**
     * Filter which Codes to update
     */
    where?: CodesWhereInput
    /**
     * Limit how many Codes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Codes upsert
   */
  export type CodesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * The filter to search for the Codes to update in case it exists.
     */
    where: CodesWhereUniqueInput
    /**
     * In case the Codes found by the `where` argument doesn't exist, create a new Codes with this data.
     */
    create: XOR<CodesCreateInput, CodesUncheckedCreateInput>
    /**
     * In case the Codes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodesUpdateInput, CodesUncheckedUpdateInput>
  }

  /**
   * Codes delete
   */
  export type CodesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
    /**
     * Filter which Codes to delete.
     */
    where: CodesWhereUniqueInput
  }

  /**
   * Codes deleteMany
   */
  export type CodesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Codes to delete
     */
    where?: CodesWhereInput
    /**
     * Limit how many Codes to delete.
     */
    limit?: number
  }

  /**
   * Codes.BingoCardboards
   */
  export type Codes$BingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    where?: BingoCardboardsWhereInput
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    cursor?: BingoCardboardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * Codes without action
   */
  export type CodesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Codes
     */
    select?: CodesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Codes
     */
    omit?: CodesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodesInclude<ExtArgs> | null
  }


  /**
   * Model Parameters
   */

  export type AggregateParameters = {
    _count: ParametersCountAggregateOutputType | null
    _avg: ParametersAvgAggregateOutputType | null
    _sum: ParametersSumAggregateOutputType | null
    _min: ParametersMinAggregateOutputType | null
    _max: ParametersMaxAggregateOutputType | null
  }

  export type ParametersAvgAggregateOutputType = {
    id: number | null
    cost_per_code: number | null
    min_participants_for_bingo: number | null
    cardboard_per_code: number | null
    last_modified_by_id: number | null
  }

  export type ParametersSumAggregateOutputType = {
    id: number | null
    cost_per_code: number | null
    min_participants_for_bingo: number | null
    cardboard_per_code: number | null
    last_modified_by_id: number | null
  }

  export type ParametersMinAggregateOutputType = {
    id: number | null
    cost_per_code: number | null
    min_participants_for_bingo: number | null
    cardboard_per_code: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    last_modified_by_id: number | null
  }

  export type ParametersMaxAggregateOutputType = {
    id: number | null
    cost_per_code: number | null
    min_participants_for_bingo: number | null
    cardboard_per_code: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    last_modified_by_id: number | null
  }

  export type ParametersCountAggregateOutputType = {
    id: number
    cost_per_code: number
    min_participants_for_bingo: number
    cardboard_per_code: number
    created_at: number
    updated_at: number
    deleted_at: number
    last_modified_by_id: number
    bingo_prizes: number
    _all: number
  }


  export type ParametersAvgAggregateInputType = {
    id?: true
    cost_per_code?: true
    min_participants_for_bingo?: true
    cardboard_per_code?: true
    last_modified_by_id?: true
  }

  export type ParametersSumAggregateInputType = {
    id?: true
    cost_per_code?: true
    min_participants_for_bingo?: true
    cardboard_per_code?: true
    last_modified_by_id?: true
  }

  export type ParametersMinAggregateInputType = {
    id?: true
    cost_per_code?: true
    min_participants_for_bingo?: true
    cardboard_per_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    last_modified_by_id?: true
  }

  export type ParametersMaxAggregateInputType = {
    id?: true
    cost_per_code?: true
    min_participants_for_bingo?: true
    cardboard_per_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    last_modified_by_id?: true
  }

  export type ParametersCountAggregateInputType = {
    id?: true
    cost_per_code?: true
    min_participants_for_bingo?: true
    cardboard_per_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    last_modified_by_id?: true
    bingo_prizes?: true
    _all?: true
  }

  export type ParametersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parameters to aggregate.
     */
    where?: ParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parameters to fetch.
     */
    orderBy?: ParametersOrderByWithRelationInput | ParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parameters
    **/
    _count?: true | ParametersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParametersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParametersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParametersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParametersMaxAggregateInputType
  }

  export type GetParametersAggregateType<T extends ParametersAggregateArgs> = {
        [P in keyof T & keyof AggregateParameters]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParameters[P]>
      : GetScalarType<T[P], AggregateParameters[P]>
  }




  export type ParametersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParametersWhereInput
    orderBy?: ParametersOrderByWithAggregationInput | ParametersOrderByWithAggregationInput[]
    by: ParametersScalarFieldEnum[] | ParametersScalarFieldEnum
    having?: ParametersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParametersCountAggregateInputType | true
    _avg?: ParametersAvgAggregateInputType
    _sum?: ParametersSumAggregateInputType
    _min?: ParametersMinAggregateInputType
    _max?: ParametersMaxAggregateInputType
  }

  export type ParametersGroupByOutputType = {
    id: number
    cost_per_code: number
    min_participants_for_bingo: number
    cardboard_per_code: number
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    last_modified_by_id: number | null
    bingo_prizes: JsonValue | null
    _count: ParametersCountAggregateOutputType | null
    _avg: ParametersAvgAggregateOutputType | null
    _sum: ParametersSumAggregateOutputType | null
    _min: ParametersMinAggregateOutputType | null
    _max: ParametersMaxAggregateOutputType | null
  }

  type GetParametersGroupByPayload<T extends ParametersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParametersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParametersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParametersGroupByOutputType[P]>
            : GetScalarType<T[P], ParametersGroupByOutputType[P]>
        }
      >
    >


  export type ParametersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_per_code?: boolean
    min_participants_for_bingo?: boolean
    cardboard_per_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    last_modified_by_id?: boolean
    bingo_prizes?: boolean
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }, ExtArgs["result"]["parameters"]>

  export type ParametersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_per_code?: boolean
    min_participants_for_bingo?: boolean
    cardboard_per_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    last_modified_by_id?: boolean
    bingo_prizes?: boolean
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }, ExtArgs["result"]["parameters"]>

  export type ParametersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_per_code?: boolean
    min_participants_for_bingo?: boolean
    cardboard_per_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    last_modified_by_id?: boolean
    bingo_prizes?: boolean
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }, ExtArgs["result"]["parameters"]>

  export type ParametersSelectScalar = {
    id?: boolean
    cost_per_code?: boolean
    min_participants_for_bingo?: boolean
    cardboard_per_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    last_modified_by_id?: boolean
    bingo_prizes?: boolean
  }

  export type ParametersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cost_per_code" | "min_participants_for_bingo" | "cardboard_per_code" | "created_at" | "updated_at" | "deleted_at" | "last_modified_by_id" | "bingo_prizes", ExtArgs["result"]["parameters"]>
  export type ParametersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }
  export type ParametersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }
  export type ParametersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    last_modified_by?: boolean | Parameters$last_modified_byArgs<ExtArgs>
  }

  export type $ParametersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parameters"
    objects: {
      last_modified_by: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cost_per_code: number
      min_participants_for_bingo: number
      cardboard_per_code: number
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      last_modified_by_id: number | null
      bingo_prizes: Prisma.JsonValue | null
    }, ExtArgs["result"]["parameters"]>
    composites: {}
  }

  type ParametersGetPayload<S extends boolean | null | undefined | ParametersDefaultArgs> = $Result.GetResult<Prisma.$ParametersPayload, S>

  type ParametersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParametersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParametersCountAggregateInputType | true
    }

  export interface ParametersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parameters'], meta: { name: 'Parameters' } }
    /**
     * Find zero or one Parameters that matches the filter.
     * @param {ParametersFindUniqueArgs} args - Arguments to find a Parameters
     * @example
     * // Get one Parameters
     * const parameters = await prisma.parameters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParametersFindUniqueArgs>(args: SelectSubset<T, ParametersFindUniqueArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parameters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParametersFindUniqueOrThrowArgs} args - Arguments to find a Parameters
     * @example
     * // Get one Parameters
     * const parameters = await prisma.parameters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParametersFindUniqueOrThrowArgs>(args: SelectSubset<T, ParametersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersFindFirstArgs} args - Arguments to find a Parameters
     * @example
     * // Get one Parameters
     * const parameters = await prisma.parameters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParametersFindFirstArgs>(args?: SelectSubset<T, ParametersFindFirstArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parameters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersFindFirstOrThrowArgs} args - Arguments to find a Parameters
     * @example
     * // Get one Parameters
     * const parameters = await prisma.parameters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParametersFindFirstOrThrowArgs>(args?: SelectSubset<T, ParametersFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parameters
     * const parameters = await prisma.parameters.findMany()
     * 
     * // Get first 10 Parameters
     * const parameters = await prisma.parameters.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parametersWithIdOnly = await prisma.parameters.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParametersFindManyArgs>(args?: SelectSubset<T, ParametersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parameters.
     * @param {ParametersCreateArgs} args - Arguments to create a Parameters.
     * @example
     * // Create one Parameters
     * const Parameters = await prisma.parameters.create({
     *   data: {
     *     // ... data to create a Parameters
     *   }
     * })
     * 
     */
    create<T extends ParametersCreateArgs>(args: SelectSubset<T, ParametersCreateArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parameters.
     * @param {ParametersCreateManyArgs} args - Arguments to create many Parameters.
     * @example
     * // Create many Parameters
     * const parameters = await prisma.parameters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParametersCreateManyArgs>(args?: SelectSubset<T, ParametersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parameters and returns the data saved in the database.
     * @param {ParametersCreateManyAndReturnArgs} args - Arguments to create many Parameters.
     * @example
     * // Create many Parameters
     * const parameters = await prisma.parameters.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parameters and only return the `id`
     * const parametersWithIdOnly = await prisma.parameters.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParametersCreateManyAndReturnArgs>(args?: SelectSubset<T, ParametersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parameters.
     * @param {ParametersDeleteArgs} args - Arguments to delete one Parameters.
     * @example
     * // Delete one Parameters
     * const Parameters = await prisma.parameters.delete({
     *   where: {
     *     // ... filter to delete one Parameters
     *   }
     * })
     * 
     */
    delete<T extends ParametersDeleteArgs>(args: SelectSubset<T, ParametersDeleteArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parameters.
     * @param {ParametersUpdateArgs} args - Arguments to update one Parameters.
     * @example
     * // Update one Parameters
     * const parameters = await prisma.parameters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParametersUpdateArgs>(args: SelectSubset<T, ParametersUpdateArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parameters.
     * @param {ParametersDeleteManyArgs} args - Arguments to filter Parameters to delete.
     * @example
     * // Delete a few Parameters
     * const { count } = await prisma.parameters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParametersDeleteManyArgs>(args?: SelectSubset<T, ParametersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parameters
     * const parameters = await prisma.parameters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParametersUpdateManyArgs>(args: SelectSubset<T, ParametersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parameters and returns the data updated in the database.
     * @param {ParametersUpdateManyAndReturnArgs} args - Arguments to update many Parameters.
     * @example
     * // Update many Parameters
     * const parameters = await prisma.parameters.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parameters and only return the `id`
     * const parametersWithIdOnly = await prisma.parameters.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends ParametersUpdateManyAndReturnArgs>(args: SelectSubset<T, ParametersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parameters.
     * @param {ParametersUpsertArgs} args - Arguments to update or create a Parameters.
     * @example
     * // Update or create a Parameters
     * const parameters = await prisma.parameters.upsert({
     *   create: {
     *     // ... data to create a Parameters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parameters we want to update
     *   }
     * })
     */
    upsert<T extends ParametersUpsertArgs>(args: SelectSubset<T, ParametersUpsertArgs<ExtArgs>>): Prisma__ParametersClient<$Result.GetResult<Prisma.$ParametersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersCountArgs} args - Arguments to filter Parameters to count.
     * @example
     * // Count the number of Parameters
     * const count = await prisma.parameters.count({
     *   where: {
     *     // ... the filter for the Parameters we want to count
     *   }
     * })
    **/
    count<T extends ParametersCountArgs>(
      args?: Subset<T, ParametersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParametersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParametersAggregateArgs>(args: Subset<T, ParametersAggregateArgs>): Prisma.PrismaPromise<GetParametersAggregateType<T>>

    /**
     * Group by Parameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParametersGroupByArgs} args - Group by arguments.
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
      T extends ParametersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParametersGroupByArgs['orderBy'] }
        : { orderBy?: ParametersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ParametersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParametersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parameters model
   */
  readonly fields: ParametersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parameters.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParametersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    last_modified_by<T extends Parameters$last_modified_byArgs<ExtArgs> = {}>(args?: Subset<T, Parameters$last_modified_byArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Parameters model
   */
  interface ParametersFieldRefs {
    readonly id: FieldRef<"Parameters", 'Int'>
    readonly cost_per_code: FieldRef<"Parameters", 'Float'>
    readonly min_participants_for_bingo: FieldRef<"Parameters", 'Int'>
    readonly cardboard_per_code: FieldRef<"Parameters", 'Int'>
    readonly created_at: FieldRef<"Parameters", 'DateTime'>
    readonly updated_at: FieldRef<"Parameters", 'DateTime'>
    readonly deleted_at: FieldRef<"Parameters", 'DateTime'>
    readonly last_modified_by_id: FieldRef<"Parameters", 'Int'>
    readonly bingo_prizes: FieldRef<"Parameters", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Parameters findUnique
   */
  export type ParametersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter, which Parameters to fetch.
     */
    where: ParametersWhereUniqueInput
  }

  /**
   * Parameters findUniqueOrThrow
   */
  export type ParametersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter, which Parameters to fetch.
     */
    where: ParametersWhereUniqueInput
  }

  /**
   * Parameters findFirst
   */
  export type ParametersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter, which Parameters to fetch.
     */
    where?: ParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parameters to fetch.
     */
    orderBy?: ParametersOrderByWithRelationInput | ParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parameters.
     */
    cursor?: ParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parameters.
     */
    distinct?: ParametersScalarFieldEnum | ParametersScalarFieldEnum[]
  }

  /**
   * Parameters findFirstOrThrow
   */
  export type ParametersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter, which Parameters to fetch.
     */
    where?: ParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parameters to fetch.
     */
    orderBy?: ParametersOrderByWithRelationInput | ParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parameters.
     */
    cursor?: ParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parameters.
     */
    distinct?: ParametersScalarFieldEnum | ParametersScalarFieldEnum[]
  }

  /**
   * Parameters findMany
   */
  export type ParametersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter, which Parameters to fetch.
     */
    where?: ParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parameters to fetch.
     */
    orderBy?: ParametersOrderByWithRelationInput | ParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parameters.
     */
    cursor?: ParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parameters.
     */
    skip?: number
    distinct?: ParametersScalarFieldEnum | ParametersScalarFieldEnum[]
  }

  /**
   * Parameters create
   */
  export type ParametersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * The data needed to create a Parameters.
     */
    data: XOR<ParametersCreateInput, ParametersUncheckedCreateInput>
  }

  /**
   * Parameters createMany
   */
  export type ParametersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parameters.
     */
    data: ParametersCreateManyInput | ParametersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parameters createManyAndReturn
   */
  export type ParametersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * The data used to create many Parameters.
     */
    data: ParametersCreateManyInput | ParametersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parameters update
   */
  export type ParametersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * The data needed to update a Parameters.
     */
    data: XOR<ParametersUpdateInput, ParametersUncheckedUpdateInput>
    /**
     * Choose, which Parameters to update.
     */
    where: ParametersWhereUniqueInput
  }

  /**
   * Parameters updateMany
   */
  export type ParametersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parameters.
     */
    data: XOR<ParametersUpdateManyMutationInput, ParametersUncheckedUpdateManyInput>
    /**
     * Filter which Parameters to update
     */
    where?: ParametersWhereInput
    /**
     * Limit how many Parameters to update.
     */
    limit?: number
  }

  /**
   * Parameters updateManyAndReturn
   */
  export type ParametersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * The data used to update Parameters.
     */
    data: XOR<ParametersUpdateManyMutationInput, ParametersUncheckedUpdateManyInput>
    /**
     * Filter which Parameters to update
     */
    where?: ParametersWhereInput
    /**
     * Limit how many Parameters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parameters upsert
   */
  export type ParametersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * The filter to search for the Parameters to update in case it exists.
     */
    where: ParametersWhereUniqueInput
    /**
     * In case the Parameters found by the `where` argument doesn't exist, create a new Parameters with this data.
     */
    create: XOR<ParametersCreateInput, ParametersUncheckedCreateInput>
    /**
     * In case the Parameters was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParametersUpdateInput, ParametersUncheckedUpdateInput>
  }

  /**
   * Parameters delete
   */
  export type ParametersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
    /**
     * Filter which Parameters to delete.
     */
    where: ParametersWhereUniqueInput
  }

  /**
   * Parameters deleteMany
   */
  export type ParametersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parameters to delete
     */
    where?: ParametersWhereInput
    /**
     * Limit how many Parameters to delete.
     */
    limit?: number
  }

  /**
   * Parameters.last_modified_by
   */
  export type Parameters$last_modified_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Parameters without action
   */
  export type ParametersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parameters
     */
    select?: ParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parameters
     */
    omit?: ParametersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParametersInclude<ExtArgs> | null
  }


  /**
   * Model Bingo
   */

  export type AggregateBingo = {
    _count: BingoCountAggregateOutputType | null
    _avg: BingoAvgAggregateOutputType | null
    _sum: BingoSumAggregateOutputType | null
    _min: BingoMinAggregateOutputType | null
    _max: BingoMaxAggregateOutputType | null
  }

  export type BingoAvgAggregateOutputType = {
    id: number | null
    number_of_participants: number | null
    cardboard_by_code: number | null
    min_number_of_participants: number | null
  }

  export type BingoSumAggregateOutputType = {
    id: number | null
    number_of_participants: number | null
    cardboard_by_code: number | null
    min_number_of_participants: number | null
  }

  export type BingoMinAggregateOutputType = {
    id: number | null
    number_of_participants: number | null
    cardboard_by_code: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    is_started: boolean | null
    min_number_of_participants: number | null
    is_finished: boolean | null
  }

  export type BingoMaxAggregateOutputType = {
    id: number | null
    number_of_participants: number | null
    cardboard_by_code: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    is_started: boolean | null
    min_number_of_participants: number | null
    is_finished: boolean | null
  }

  export type BingoCountAggregateOutputType = {
    id: number
    number_of_participants: number
    cardboard_by_code: number
    created_at: number
    updated_at: number
    deleted_at: number
    is_started: number
    min_number_of_participants: number
    winners: number
    bingo_prizes: number
    numbers_played: number
    is_finished: number
    _all: number
  }


  export type BingoAvgAggregateInputType = {
    id?: true
    number_of_participants?: true
    cardboard_by_code?: true
    min_number_of_participants?: true
  }

  export type BingoSumAggregateInputType = {
    id?: true
    number_of_participants?: true
    cardboard_by_code?: true
    min_number_of_participants?: true
  }

  export type BingoMinAggregateInputType = {
    id?: true
    number_of_participants?: true
    cardboard_by_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_started?: true
    min_number_of_participants?: true
    is_finished?: true
  }

  export type BingoMaxAggregateInputType = {
    id?: true
    number_of_participants?: true
    cardboard_by_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_started?: true
    min_number_of_participants?: true
    is_finished?: true
  }

  export type BingoCountAggregateInputType = {
    id?: true
    number_of_participants?: true
    cardboard_by_code?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_started?: true
    min_number_of_participants?: true
    winners?: true
    bingo_prizes?: true
    numbers_played?: true
    is_finished?: true
    _all?: true
  }

  export type BingoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bingo to aggregate.
     */
    where?: BingoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bingos to fetch.
     */
    orderBy?: BingoOrderByWithRelationInput | BingoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BingoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bingos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bingos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bingos
    **/
    _count?: true | BingoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BingoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BingoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BingoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BingoMaxAggregateInputType
  }

  export type GetBingoAggregateType<T extends BingoAggregateArgs> = {
        [P in keyof T & keyof AggregateBingo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBingo[P]>
      : GetScalarType<T[P], AggregateBingo[P]>
  }




  export type BingoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoWhereInput
    orderBy?: BingoOrderByWithAggregationInput | BingoOrderByWithAggregationInput[]
    by: BingoScalarFieldEnum[] | BingoScalarFieldEnum
    having?: BingoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BingoCountAggregateInputType | true
    _avg?: BingoAvgAggregateInputType
    _sum?: BingoSumAggregateInputType
    _min?: BingoMinAggregateInputType
    _max?: BingoMaxAggregateInputType
  }

  export type BingoGroupByOutputType = {
    id: number
    number_of_participants: number
    cardboard_by_code: number
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    is_started: boolean
    min_number_of_participants: number | null
    winners: JsonValue | null
    bingo_prizes: JsonValue | null
    numbers_played: JsonValue | null
    is_finished: boolean | null
    _count: BingoCountAggregateOutputType | null
    _avg: BingoAvgAggregateOutputType | null
    _sum: BingoSumAggregateOutputType | null
    _min: BingoMinAggregateOutputType | null
    _max: BingoMaxAggregateOutputType | null
  }

  type GetBingoGroupByPayload<T extends BingoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BingoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BingoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BingoGroupByOutputType[P]>
            : GetScalarType<T[P], BingoGroupByOutputType[P]>
        }
      >
    >


  export type BingoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number_of_participants?: boolean
    cardboard_by_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_started?: boolean
    min_number_of_participants?: boolean
    winners?: boolean
    bingo_prizes?: boolean
    numbers_played?: boolean
    is_finished?: boolean
    BingoCardboards?: boolean | Bingo$BingoCardboardsArgs<ExtArgs>
    _count?: boolean | BingoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bingo"]>

  export type BingoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number_of_participants?: boolean
    cardboard_by_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_started?: boolean
    min_number_of_participants?: boolean
    winners?: boolean
    bingo_prizes?: boolean
    numbers_played?: boolean
    is_finished?: boolean
  }, ExtArgs["result"]["bingo"]>

  export type BingoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number_of_participants?: boolean
    cardboard_by_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_started?: boolean
    min_number_of_participants?: boolean
    winners?: boolean
    bingo_prizes?: boolean
    numbers_played?: boolean
    is_finished?: boolean
  }, ExtArgs["result"]["bingo"]>

  export type BingoSelectScalar = {
    id?: boolean
    number_of_participants?: boolean
    cardboard_by_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_started?: boolean
    min_number_of_participants?: boolean
    winners?: boolean
    bingo_prizes?: boolean
    numbers_played?: boolean
    is_finished?: boolean
  }

  export type BingoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number_of_participants" | "cardboard_by_code" | "created_at" | "updated_at" | "deleted_at" | "is_started" | "min_number_of_participants" | "winners" | "bingo_prizes" | "numbers_played" | "is_finished", ExtArgs["result"]["bingo"]>
  export type BingoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    BingoCardboards?: boolean | Bingo$BingoCardboardsArgs<ExtArgs>
    _count?: boolean | BingoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BingoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BingoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BingoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bingo"
    objects: {
      BingoCardboards: Prisma.$BingoCardboardsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      number_of_participants: number
      cardboard_by_code: number
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      is_started: boolean
      min_number_of_participants: number | null
      winners: Prisma.JsonValue | null
      bingo_prizes: Prisma.JsonValue | null
      numbers_played: Prisma.JsonValue | null
      is_finished: boolean | null
    }, ExtArgs["result"]["bingo"]>
    composites: {}
  }

  type BingoGetPayload<S extends boolean | null | undefined | BingoDefaultArgs> = $Result.GetResult<Prisma.$BingoPayload, S>

  type BingoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BingoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BingoCountAggregateInputType | true
    }

  export interface BingoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bingo'], meta: { name: 'Bingo' } }
    /**
     * Find zero or one Bingo that matches the filter.
     * @param {BingoFindUniqueArgs} args - Arguments to find a Bingo
     * @example
     * // Get one Bingo
     * const bingo = await prisma.bingo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BingoFindUniqueArgs>(args: SelectSubset<T, BingoFindUniqueArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bingo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BingoFindUniqueOrThrowArgs} args - Arguments to find a Bingo
     * @example
     * // Get one Bingo
     * const bingo = await prisma.bingo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BingoFindUniqueOrThrowArgs>(args: SelectSubset<T, BingoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bingo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoFindFirstArgs} args - Arguments to find a Bingo
     * @example
     * // Get one Bingo
     * const bingo = await prisma.bingo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BingoFindFirstArgs>(args?: SelectSubset<T, BingoFindFirstArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bingo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoFindFirstOrThrowArgs} args - Arguments to find a Bingo
     * @example
     * // Get one Bingo
     * const bingo = await prisma.bingo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BingoFindFirstOrThrowArgs>(args?: SelectSubset<T, BingoFindFirstOrThrowArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bingos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bingos
     * const bingos = await prisma.bingo.findMany()
     * 
     * // Get first 10 Bingos
     * const bingos = await prisma.bingo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bingoWithIdOnly = await prisma.bingo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BingoFindManyArgs>(args?: SelectSubset<T, BingoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bingo.
     * @param {BingoCreateArgs} args - Arguments to create a Bingo.
     * @example
     * // Create one Bingo
     * const Bingo = await prisma.bingo.create({
     *   data: {
     *     // ... data to create a Bingo
     *   }
     * })
     * 
     */
    create<T extends BingoCreateArgs>(args: SelectSubset<T, BingoCreateArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bingos.
     * @param {BingoCreateManyArgs} args - Arguments to create many Bingos.
     * @example
     * // Create many Bingos
     * const bingo = await prisma.bingo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BingoCreateManyArgs>(args?: SelectSubset<T, BingoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bingos and returns the data saved in the database.
     * @param {BingoCreateManyAndReturnArgs} args - Arguments to create many Bingos.
     * @example
     * // Create many Bingos
     * const bingo = await prisma.bingo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bingos and only return the `id`
     * const bingoWithIdOnly = await prisma.bingo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BingoCreateManyAndReturnArgs>(args?: SelectSubset<T, BingoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bingo.
     * @param {BingoDeleteArgs} args - Arguments to delete one Bingo.
     * @example
     * // Delete one Bingo
     * const Bingo = await prisma.bingo.delete({
     *   where: {
     *     // ... filter to delete one Bingo
     *   }
     * })
     * 
     */
    delete<T extends BingoDeleteArgs>(args: SelectSubset<T, BingoDeleteArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bingo.
     * @param {BingoUpdateArgs} args - Arguments to update one Bingo.
     * @example
     * // Update one Bingo
     * const bingo = await prisma.bingo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BingoUpdateArgs>(args: SelectSubset<T, BingoUpdateArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bingos.
     * @param {BingoDeleteManyArgs} args - Arguments to filter Bingos to delete.
     * @example
     * // Delete a few Bingos
     * const { count } = await prisma.bingo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BingoDeleteManyArgs>(args?: SelectSubset<T, BingoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bingos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bingos
     * const bingo = await prisma.bingo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BingoUpdateManyArgs>(args: SelectSubset<T, BingoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bingos and returns the data updated in the database.
     * @param {BingoUpdateManyAndReturnArgs} args - Arguments to update many Bingos.
     * @example
     * // Update many Bingos
     * const bingo = await prisma.bingo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bingos and only return the `id`
     * const bingoWithIdOnly = await prisma.bingo.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends BingoUpdateManyAndReturnArgs>(args: SelectSubset<T, BingoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bingo.
     * @param {BingoUpsertArgs} args - Arguments to update or create a Bingo.
     * @example
     * // Update or create a Bingo
     * const bingo = await prisma.bingo.upsert({
     *   create: {
     *     // ... data to create a Bingo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bingo we want to update
     *   }
     * })
     */
    upsert<T extends BingoUpsertArgs>(args: SelectSubset<T, BingoUpsertArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bingos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCountArgs} args - Arguments to filter Bingos to count.
     * @example
     * // Count the number of Bingos
     * const count = await prisma.bingo.count({
     *   where: {
     *     // ... the filter for the Bingos we want to count
     *   }
     * })
    **/
    count<T extends BingoCountArgs>(
      args?: Subset<T, BingoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BingoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bingo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BingoAggregateArgs>(args: Subset<T, BingoAggregateArgs>): Prisma.PrismaPromise<GetBingoAggregateType<T>>

    /**
     * Group by Bingo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoGroupByArgs} args - Group by arguments.
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
      T extends BingoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BingoGroupByArgs['orderBy'] }
        : { orderBy?: BingoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BingoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBingoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bingo model
   */
  readonly fields: BingoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bingo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BingoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    BingoCardboards<T extends Bingo$BingoCardboardsArgs<ExtArgs> = {}>(args?: Subset<T, Bingo$BingoCardboardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Bingo model
   */
  interface BingoFieldRefs {
    readonly id: FieldRef<"Bingo", 'Int'>
    readonly number_of_participants: FieldRef<"Bingo", 'Int'>
    readonly cardboard_by_code: FieldRef<"Bingo", 'Int'>
    readonly created_at: FieldRef<"Bingo", 'DateTime'>
    readonly updated_at: FieldRef<"Bingo", 'DateTime'>
    readonly deleted_at: FieldRef<"Bingo", 'DateTime'>
    readonly is_started: FieldRef<"Bingo", 'Boolean'>
    readonly min_number_of_participants: FieldRef<"Bingo", 'Int'>
    readonly winners: FieldRef<"Bingo", 'Json'>
    readonly bingo_prizes: FieldRef<"Bingo", 'Json'>
    readonly numbers_played: FieldRef<"Bingo", 'Json'>
    readonly is_finished: FieldRef<"Bingo", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Bingo findUnique
   */
  export type BingoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter, which Bingo to fetch.
     */
    where: BingoWhereUniqueInput
  }

  /**
   * Bingo findUniqueOrThrow
   */
  export type BingoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter, which Bingo to fetch.
     */
    where: BingoWhereUniqueInput
  }

  /**
   * Bingo findFirst
   */
  export type BingoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter, which Bingo to fetch.
     */
    where?: BingoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bingos to fetch.
     */
    orderBy?: BingoOrderByWithRelationInput | BingoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bingos.
     */
    cursor?: BingoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bingos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bingos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bingos.
     */
    distinct?: BingoScalarFieldEnum | BingoScalarFieldEnum[]
  }

  /**
   * Bingo findFirstOrThrow
   */
  export type BingoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter, which Bingo to fetch.
     */
    where?: BingoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bingos to fetch.
     */
    orderBy?: BingoOrderByWithRelationInput | BingoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bingos.
     */
    cursor?: BingoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bingos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bingos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bingos.
     */
    distinct?: BingoScalarFieldEnum | BingoScalarFieldEnum[]
  }

  /**
   * Bingo findMany
   */
  export type BingoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter, which Bingos to fetch.
     */
    where?: BingoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bingos to fetch.
     */
    orderBy?: BingoOrderByWithRelationInput | BingoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bingos.
     */
    cursor?: BingoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bingos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bingos.
     */
    skip?: number
    distinct?: BingoScalarFieldEnum | BingoScalarFieldEnum[]
  }

  /**
   * Bingo create
   */
  export type BingoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * The data needed to create a Bingo.
     */
    data: XOR<BingoCreateInput, BingoUncheckedCreateInput>
  }

  /**
   * Bingo createMany
   */
  export type BingoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bingos.
     */
    data: BingoCreateManyInput | BingoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bingo createManyAndReturn
   */
  export type BingoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * The data used to create many Bingos.
     */
    data: BingoCreateManyInput | BingoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bingo update
   */
  export type BingoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * The data needed to update a Bingo.
     */
    data: XOR<BingoUpdateInput, BingoUncheckedUpdateInput>
    /**
     * Choose, which Bingo to update.
     */
    where: BingoWhereUniqueInput
  }

  /**
   * Bingo updateMany
   */
  export type BingoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bingos.
     */
    data: XOR<BingoUpdateManyMutationInput, BingoUncheckedUpdateManyInput>
    /**
     * Filter which Bingos to update
     */
    where?: BingoWhereInput
    /**
     * Limit how many Bingos to update.
     */
    limit?: number
  }

  /**
   * Bingo updateManyAndReturn
   */
  export type BingoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * The data used to update Bingos.
     */
    data: XOR<BingoUpdateManyMutationInput, BingoUncheckedUpdateManyInput>
    /**
     * Filter which Bingos to update
     */
    where?: BingoWhereInput
    /**
     * Limit how many Bingos to update.
     */
    limit?: number
  }

  /**
   * Bingo upsert
   */
  export type BingoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * The filter to search for the Bingo to update in case it exists.
     */
    where: BingoWhereUniqueInput
    /**
     * In case the Bingo found by the `where` argument doesn't exist, create a new Bingo with this data.
     */
    create: XOR<BingoCreateInput, BingoUncheckedCreateInput>
    /**
     * In case the Bingo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BingoUpdateInput, BingoUncheckedUpdateInput>
  }

  /**
   * Bingo delete
   */
  export type BingoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
    /**
     * Filter which Bingo to delete.
     */
    where: BingoWhereUniqueInput
  }

  /**
   * Bingo deleteMany
   */
  export type BingoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bingos to delete
     */
    where?: BingoWhereInput
    /**
     * Limit how many Bingos to delete.
     */
    limit?: number
  }

  /**
   * Bingo.BingoCardboards
   */
  export type Bingo$BingoCardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    where?: BingoCardboardsWhereInput
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    cursor?: BingoCardboardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * Bingo without action
   */
  export type BingoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bingo
     */
    select?: BingoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bingo
     */
    omit?: BingoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoInclude<ExtArgs> | null
  }


  /**
   * Model BingoCardboards
   */

  export type AggregateBingoCardboards = {
    _count: BingoCardboardsCountAggregateOutputType | null
    _avg: BingoCardboardsAvgAggregateOutputType | null
    _sum: BingoCardboardsSumAggregateOutputType | null
    _min: BingoCardboardsMinAggregateOutputType | null
    _max: BingoCardboardsMaxAggregateOutputType | null
  }

  export type BingoCardboardsAvgAggregateOutputType = {
    id: number | null
    code_id: number | null
    bingo_id: number | null
    user_id: number | null
    prize_id: number | null
  }

  export type BingoCardboardsSumAggregateOutputType = {
    id: number | null
    code_id: number | null
    bingo_id: number | null
    user_id: number | null
    prize_id: number | null
  }

  export type BingoCardboardsMinAggregateOutputType = {
    id: number | null
    code_id: number | null
    bingo_id: number | null
    is_winner: boolean | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    prize_id: number | null
  }

  export type BingoCardboardsMaxAggregateOutputType = {
    id: number | null
    code_id: number | null
    bingo_id: number | null
    is_winner: boolean | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    prize_id: number | null
  }

  export type BingoCardboardsCountAggregateOutputType = {
    id: number
    code_id: number
    bingo_id: number
    is_winner: number
    user_id: number
    bingo_data_json: number
    created_at: number
    updated_at: number
    deleted_at: number
    prize_id: number
    _all: number
  }


  export type BingoCardboardsAvgAggregateInputType = {
    id?: true
    code_id?: true
    bingo_id?: true
    user_id?: true
    prize_id?: true
  }

  export type BingoCardboardsSumAggregateInputType = {
    id?: true
    code_id?: true
    bingo_id?: true
    user_id?: true
    prize_id?: true
  }

  export type BingoCardboardsMinAggregateInputType = {
    id?: true
    code_id?: true
    bingo_id?: true
    is_winner?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    prize_id?: true
  }

  export type BingoCardboardsMaxAggregateInputType = {
    id?: true
    code_id?: true
    bingo_id?: true
    is_winner?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    prize_id?: true
  }

  export type BingoCardboardsCountAggregateInputType = {
    id?: true
    code_id?: true
    bingo_id?: true
    is_winner?: true
    user_id?: true
    bingo_data_json?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    prize_id?: true
    _all?: true
  }

  export type BingoCardboardsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BingoCardboards to aggregate.
     */
    where?: BingoCardboardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BingoCardboards to fetch.
     */
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BingoCardboardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BingoCardboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BingoCardboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BingoCardboards
    **/
    _count?: true | BingoCardboardsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BingoCardboardsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BingoCardboardsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BingoCardboardsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BingoCardboardsMaxAggregateInputType
  }

  export type GetBingoCardboardsAggregateType<T extends BingoCardboardsAggregateArgs> = {
        [P in keyof T & keyof AggregateBingoCardboards]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBingoCardboards[P]>
      : GetScalarType<T[P], AggregateBingoCardboards[P]>
  }




  export type BingoCardboardsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BingoCardboardsWhereInput
    orderBy?: BingoCardboardsOrderByWithAggregationInput | BingoCardboardsOrderByWithAggregationInput[]
    by: BingoCardboardsScalarFieldEnum[] | BingoCardboardsScalarFieldEnum
    having?: BingoCardboardsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BingoCardboardsCountAggregateInputType | true
    _avg?: BingoCardboardsAvgAggregateInputType
    _sum?: BingoCardboardsSumAggregateInputType
    _min?: BingoCardboardsMinAggregateInputType
    _max?: BingoCardboardsMaxAggregateInputType
  }

  export type BingoCardboardsGroupByOutputType = {
    id: number
    code_id: number
    bingo_id: number
    is_winner: boolean
    user_id: number
    bingo_data_json: JsonValue
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    prize_id: number | null
    _count: BingoCardboardsCountAggregateOutputType | null
    _avg: BingoCardboardsAvgAggregateOutputType | null
    _sum: BingoCardboardsSumAggregateOutputType | null
    _min: BingoCardboardsMinAggregateOutputType | null
    _max: BingoCardboardsMaxAggregateOutputType | null
  }

  type GetBingoCardboardsGroupByPayload<T extends BingoCardboardsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BingoCardboardsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BingoCardboardsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BingoCardboardsGroupByOutputType[P]>
            : GetScalarType<T[P], BingoCardboardsGroupByOutputType[P]>
        }
      >
    >


  export type BingoCardboardsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code_id?: boolean
    bingo_id?: boolean
    is_winner?: boolean
    user_id?: boolean
    bingo_data_json?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    prize_id?: boolean
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bingoCardboards"]>

  export type BingoCardboardsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code_id?: boolean
    bingo_id?: boolean
    is_winner?: boolean
    user_id?: boolean
    bingo_data_json?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    prize_id?: boolean
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bingoCardboards"]>

  export type BingoCardboardsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code_id?: boolean
    bingo_id?: boolean
    is_winner?: boolean
    user_id?: boolean
    bingo_data_json?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    prize_id?: boolean
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bingoCardboards"]>

  export type BingoCardboardsSelectScalar = {
    id?: boolean
    code_id?: boolean
    bingo_id?: boolean
    is_winner?: boolean
    user_id?: boolean
    bingo_data_json?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    prize_id?: boolean
  }

  export type BingoCardboardsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code_id" | "bingo_id" | "is_winner" | "user_id" | "bingo_data_json" | "created_at" | "updated_at" | "deleted_at" | "prize_id", ExtArgs["result"]["bingoCardboards"]>
  export type BingoCardboardsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BingoCardboardsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BingoCardboardsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bingo?: boolean | BingoDefaultArgs<ExtArgs>
    Codes?: boolean | CodesDefaultArgs<ExtArgs>
    bingo_prizes?: boolean | BingoCardboards$bingo_prizesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BingoCardboardsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BingoCardboards"
    objects: {
      bingo: Prisma.$BingoPayload<ExtArgs>
      Codes: Prisma.$CodesPayload<ExtArgs>
      bingo_prizes: Prisma.$bingo_prizesPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code_id: number
      bingo_id: number
      is_winner: boolean
      user_id: number
      bingo_data_json: Prisma.JsonValue
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      prize_id: number | null
    }, ExtArgs["result"]["bingoCardboards"]>
    composites: {}
  }

  type BingoCardboardsGetPayload<S extends boolean | null | undefined | BingoCardboardsDefaultArgs> = $Result.GetResult<Prisma.$BingoCardboardsPayload, S>

  type BingoCardboardsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BingoCardboardsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BingoCardboardsCountAggregateInputType | true
    }

  export interface BingoCardboardsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BingoCardboards'], meta: { name: 'BingoCardboards' } }
    /**
     * Find zero or one BingoCardboards that matches the filter.
     * @param {BingoCardboardsFindUniqueArgs} args - Arguments to find a BingoCardboards
     * @example
     * // Get one BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BingoCardboardsFindUniqueArgs>(args: SelectSubset<T, BingoCardboardsFindUniqueArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BingoCardboards that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BingoCardboardsFindUniqueOrThrowArgs} args - Arguments to find a BingoCardboards
     * @example
     * // Get one BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BingoCardboardsFindUniqueOrThrowArgs>(args: SelectSubset<T, BingoCardboardsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BingoCardboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsFindFirstArgs} args - Arguments to find a BingoCardboards
     * @example
     * // Get one BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BingoCardboardsFindFirstArgs>(args?: SelectSubset<T, BingoCardboardsFindFirstArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BingoCardboards that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsFindFirstOrThrowArgs} args - Arguments to find a BingoCardboards
     * @example
     * // Get one BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BingoCardboardsFindFirstOrThrowArgs>(args?: SelectSubset<T, BingoCardboardsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BingoCardboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findMany()
     * 
     * // Get first 10 BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bingoCardboardsWithIdOnly = await prisma.bingoCardboards.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BingoCardboardsFindManyArgs>(args?: SelectSubset<T, BingoCardboardsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BingoCardboards.
     * @param {BingoCardboardsCreateArgs} args - Arguments to create a BingoCardboards.
     * @example
     * // Create one BingoCardboards
     * const BingoCardboards = await prisma.bingoCardboards.create({
     *   data: {
     *     // ... data to create a BingoCardboards
     *   }
     * })
     * 
     */
    create<T extends BingoCardboardsCreateArgs>(args: SelectSubset<T, BingoCardboardsCreateArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BingoCardboards.
     * @param {BingoCardboardsCreateManyArgs} args - Arguments to create many BingoCardboards.
     * @example
     * // Create many BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BingoCardboardsCreateManyArgs>(args?: SelectSubset<T, BingoCardboardsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BingoCardboards and returns the data saved in the database.
     * @param {BingoCardboardsCreateManyAndReturnArgs} args - Arguments to create many BingoCardboards.
     * @example
     * // Create many BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BingoCardboards and only return the `id`
     * const bingoCardboardsWithIdOnly = await prisma.bingoCardboards.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BingoCardboardsCreateManyAndReturnArgs>(args?: SelectSubset<T, BingoCardboardsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BingoCardboards.
     * @param {BingoCardboardsDeleteArgs} args - Arguments to delete one BingoCardboards.
     * @example
     * // Delete one BingoCardboards
     * const BingoCardboards = await prisma.bingoCardboards.delete({
     *   where: {
     *     // ... filter to delete one BingoCardboards
     *   }
     * })
     * 
     */
    delete<T extends BingoCardboardsDeleteArgs>(args: SelectSubset<T, BingoCardboardsDeleteArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BingoCardboards.
     * @param {BingoCardboardsUpdateArgs} args - Arguments to update one BingoCardboards.
     * @example
     * // Update one BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BingoCardboardsUpdateArgs>(args: SelectSubset<T, BingoCardboardsUpdateArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BingoCardboards.
     * @param {BingoCardboardsDeleteManyArgs} args - Arguments to filter BingoCardboards to delete.
     * @example
     * // Delete a few BingoCardboards
     * const { count } = await prisma.bingoCardboards.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BingoCardboardsDeleteManyArgs>(args?: SelectSubset<T, BingoCardboardsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BingoCardboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BingoCardboardsUpdateManyArgs>(args: SelectSubset<T, BingoCardboardsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BingoCardboards and returns the data updated in the database.
     * @param {BingoCardboardsUpdateManyAndReturnArgs} args - Arguments to update many BingoCardboards.
     * @example
     * // Update many BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BingoCardboards and only return the `id`
     * const bingoCardboardsWithIdOnly = await prisma.bingoCardboards.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends BingoCardboardsUpdateManyAndReturnArgs>(args: SelectSubset<T, BingoCardboardsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BingoCardboards.
     * @param {BingoCardboardsUpsertArgs} args - Arguments to update or create a BingoCardboards.
     * @example
     * // Update or create a BingoCardboards
     * const bingoCardboards = await prisma.bingoCardboards.upsert({
     *   create: {
     *     // ... data to create a BingoCardboards
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BingoCardboards we want to update
     *   }
     * })
     */
    upsert<T extends BingoCardboardsUpsertArgs>(args: SelectSubset<T, BingoCardboardsUpsertArgs<ExtArgs>>): Prisma__BingoCardboardsClient<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BingoCardboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsCountArgs} args - Arguments to filter BingoCardboards to count.
     * @example
     * // Count the number of BingoCardboards
     * const count = await prisma.bingoCardboards.count({
     *   where: {
     *     // ... the filter for the BingoCardboards we want to count
     *   }
     * })
    **/
    count<T extends BingoCardboardsCountArgs>(
      args?: Subset<T, BingoCardboardsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BingoCardboardsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BingoCardboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BingoCardboardsAggregateArgs>(args: Subset<T, BingoCardboardsAggregateArgs>): Prisma.PrismaPromise<GetBingoCardboardsAggregateType<T>>

    /**
     * Group by BingoCardboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BingoCardboardsGroupByArgs} args - Group by arguments.
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
      T extends BingoCardboardsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BingoCardboardsGroupByArgs['orderBy'] }
        : { orderBy?: BingoCardboardsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BingoCardboardsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBingoCardboardsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BingoCardboards model
   */
  readonly fields: BingoCardboardsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BingoCardboards.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BingoCardboardsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bingo<T extends BingoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BingoDefaultArgs<ExtArgs>>): Prisma__BingoClient<$Result.GetResult<Prisma.$BingoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Codes<T extends CodesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CodesDefaultArgs<ExtArgs>>): Prisma__CodesClient<$Result.GetResult<Prisma.$CodesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bingo_prizes<T extends BingoCardboards$bingo_prizesArgs<ExtArgs> = {}>(args?: Subset<T, BingoCardboards$bingo_prizesArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BingoCardboards model
   */
  interface BingoCardboardsFieldRefs {
    readonly id: FieldRef<"BingoCardboards", 'Int'>
    readonly code_id: FieldRef<"BingoCardboards", 'Int'>
    readonly bingo_id: FieldRef<"BingoCardboards", 'Int'>
    readonly is_winner: FieldRef<"BingoCardboards", 'Boolean'>
    readonly user_id: FieldRef<"BingoCardboards", 'Int'>
    readonly bingo_data_json: FieldRef<"BingoCardboards", 'Json'>
    readonly created_at: FieldRef<"BingoCardboards", 'DateTime'>
    readonly updated_at: FieldRef<"BingoCardboards", 'DateTime'>
    readonly deleted_at: FieldRef<"BingoCardboards", 'DateTime'>
    readonly prize_id: FieldRef<"BingoCardboards", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BingoCardboards findUnique
   */
  export type BingoCardboardsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter, which BingoCardboards to fetch.
     */
    where: BingoCardboardsWhereUniqueInput
  }

  /**
   * BingoCardboards findUniqueOrThrow
   */
  export type BingoCardboardsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter, which BingoCardboards to fetch.
     */
    where: BingoCardboardsWhereUniqueInput
  }

  /**
   * BingoCardboards findFirst
   */
  export type BingoCardboardsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter, which BingoCardboards to fetch.
     */
    where?: BingoCardboardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BingoCardboards to fetch.
     */
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BingoCardboards.
     */
    cursor?: BingoCardboardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BingoCardboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BingoCardboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BingoCardboards.
     */
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * BingoCardboards findFirstOrThrow
   */
  export type BingoCardboardsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter, which BingoCardboards to fetch.
     */
    where?: BingoCardboardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BingoCardboards to fetch.
     */
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BingoCardboards.
     */
    cursor?: BingoCardboardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BingoCardboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BingoCardboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BingoCardboards.
     */
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * BingoCardboards findMany
   */
  export type BingoCardboardsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter, which BingoCardboards to fetch.
     */
    where?: BingoCardboardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BingoCardboards to fetch.
     */
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BingoCardboards.
     */
    cursor?: BingoCardboardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BingoCardboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BingoCardboards.
     */
    skip?: number
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * BingoCardboards create
   */
  export type BingoCardboardsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * The data needed to create a BingoCardboards.
     */
    data: XOR<BingoCardboardsCreateInput, BingoCardboardsUncheckedCreateInput>
  }

  /**
   * BingoCardboards createMany
   */
  export type BingoCardboardsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BingoCardboards.
     */
    data: BingoCardboardsCreateManyInput | BingoCardboardsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BingoCardboards createManyAndReturn
   */
  export type BingoCardboardsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * The data used to create many BingoCardboards.
     */
    data: BingoCardboardsCreateManyInput | BingoCardboardsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BingoCardboards update
   */
  export type BingoCardboardsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * The data needed to update a BingoCardboards.
     */
    data: XOR<BingoCardboardsUpdateInput, BingoCardboardsUncheckedUpdateInput>
    /**
     * Choose, which BingoCardboards to update.
     */
    where: BingoCardboardsWhereUniqueInput
  }

  /**
   * BingoCardboards updateMany
   */
  export type BingoCardboardsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BingoCardboards.
     */
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyInput>
    /**
     * Filter which BingoCardboards to update
     */
    where?: BingoCardboardsWhereInput
    /**
     * Limit how many BingoCardboards to update.
     */
    limit?: number
  }

  /**
   * BingoCardboards updateManyAndReturn
   */
  export type BingoCardboardsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * The data used to update BingoCardboards.
     */
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyInput>
    /**
     * Filter which BingoCardboards to update
     */
    where?: BingoCardboardsWhereInput
    /**
     * Limit how many BingoCardboards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BingoCardboards upsert
   */
  export type BingoCardboardsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * The filter to search for the BingoCardboards to update in case it exists.
     */
    where: BingoCardboardsWhereUniqueInput
    /**
     * In case the BingoCardboards found by the `where` argument doesn't exist, create a new BingoCardboards with this data.
     */
    create: XOR<BingoCardboardsCreateInput, BingoCardboardsUncheckedCreateInput>
    /**
     * In case the BingoCardboards was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BingoCardboardsUpdateInput, BingoCardboardsUncheckedUpdateInput>
  }

  /**
   * BingoCardboards delete
   */
  export type BingoCardboardsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    /**
     * Filter which BingoCardboards to delete.
     */
    where: BingoCardboardsWhereUniqueInput
  }

  /**
   * BingoCardboards deleteMany
   */
  export type BingoCardboardsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BingoCardboards to delete
     */
    where?: BingoCardboardsWhereInput
    /**
     * Limit how many BingoCardboards to delete.
     */
    limit?: number
  }

  /**
   * BingoCardboards.bingo_prizes
   */
  export type BingoCardboards$bingo_prizesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    where?: bingo_prizesWhereInput
  }

  /**
   * BingoCardboards without action
   */
  export type BingoCardboardsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
  }


  /**
   * Model live_sessions
   */

  export type AggregateLive_sessions = {
    _count: Live_sessionsCountAggregateOutputType | null
    _avg: Live_sessionsAvgAggregateOutputType | null
    _sum: Live_sessionsSumAggregateOutputType | null
    _min: Live_sessionsMinAggregateOutputType | null
    _max: Live_sessionsMaxAggregateOutputType | null
  }

  export type Live_sessionsAvgAggregateOutputType = {
    id: number | null
  }

  export type Live_sessionsSumAggregateOutputType = {
    id: number | null
  }

  export type Live_sessionsMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    link: string | null
    origin: $Enums.OriginSession | null
    prize: $Enums.BingoPrize | null
  }

  export type Live_sessionsMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    link: string | null
    origin: $Enums.OriginSession | null
    prize: $Enums.BingoPrize | null
  }

  export type Live_sessionsCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    deleted_at: number
    link: number
    origin: number
    prize: number
    _all: number
  }


  export type Live_sessionsAvgAggregateInputType = {
    id?: true
  }

  export type Live_sessionsSumAggregateInputType = {
    id?: true
  }

  export type Live_sessionsMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    link?: true
    origin?: true
    prize?: true
  }

  export type Live_sessionsMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    link?: true
    origin?: true
    prize?: true
  }

  export type Live_sessionsCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    link?: true
    origin?: true
    prize?: true
    _all?: true
  }

  export type Live_sessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which live_sessions to aggregate.
     */
    where?: live_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of live_sessions to fetch.
     */
    orderBy?: live_sessionsOrderByWithRelationInput | live_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: live_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` live_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` live_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned live_sessions
    **/
    _count?: true | Live_sessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Live_sessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Live_sessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Live_sessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Live_sessionsMaxAggregateInputType
  }

  export type GetLive_sessionsAggregateType<T extends Live_sessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateLive_sessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLive_sessions[P]>
      : GetScalarType<T[P], AggregateLive_sessions[P]>
  }




  export type live_sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: live_sessionsWhereInput
    orderBy?: live_sessionsOrderByWithAggregationInput | live_sessionsOrderByWithAggregationInput[]
    by: Live_sessionsScalarFieldEnum[] | Live_sessionsScalarFieldEnum
    having?: live_sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Live_sessionsCountAggregateInputType | true
    _avg?: Live_sessionsAvgAggregateInputType
    _sum?: Live_sessionsSumAggregateInputType
    _min?: Live_sessionsMinAggregateInputType
    _max?: Live_sessionsMaxAggregateInputType
  }

  export type Live_sessionsGroupByOutputType = {
    id: number
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    link: string | null
    origin: $Enums.OriginSession
    prize: $Enums.BingoPrize
    _count: Live_sessionsCountAggregateOutputType | null
    _avg: Live_sessionsAvgAggregateOutputType | null
    _sum: Live_sessionsSumAggregateOutputType | null
    _min: Live_sessionsMinAggregateOutputType | null
    _max: Live_sessionsMaxAggregateOutputType | null
  }

  type GetLive_sessionsGroupByPayload<T extends live_sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Live_sessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Live_sessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Live_sessionsGroupByOutputType[P]>
            : GetScalarType<T[P], Live_sessionsGroupByOutputType[P]>
        }
      >
    >


  export type live_sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    link?: boolean
    origin?: boolean
    prize?: boolean
  }, ExtArgs["result"]["live_sessions"]>

  export type live_sessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    link?: boolean
    origin?: boolean
    prize?: boolean
  }, ExtArgs["result"]["live_sessions"]>

  export type live_sessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    link?: boolean
    origin?: boolean
    prize?: boolean
  }, ExtArgs["result"]["live_sessions"]>

  export type live_sessionsSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    link?: boolean
    origin?: boolean
    prize?: boolean
  }

  export type live_sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "deleted_at" | "link" | "origin" | "prize", ExtArgs["result"]["live_sessions"]>

  export type $live_sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "live_sessions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      updated_at: Date | null
      deleted_at: Date | null
      link: string | null
      origin: $Enums.OriginSession
      prize: $Enums.BingoPrize
    }, ExtArgs["result"]["live_sessions"]>
    composites: {}
  }

  type live_sessionsGetPayload<S extends boolean | null | undefined | live_sessionsDefaultArgs> = $Result.GetResult<Prisma.$live_sessionsPayload, S>

  type live_sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<live_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Live_sessionsCountAggregateInputType | true
    }

  export interface live_sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['live_sessions'], meta: { name: 'live_sessions' } }
    /**
     * Find zero or one Live_sessions that matches the filter.
     * @param {live_sessionsFindUniqueArgs} args - Arguments to find a Live_sessions
     * @example
     * // Get one Live_sessions
     * const live_sessions = await prisma.live_sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends live_sessionsFindUniqueArgs>(args: SelectSubset<T, live_sessionsFindUniqueArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Live_sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {live_sessionsFindUniqueOrThrowArgs} args - Arguments to find a Live_sessions
     * @example
     * // Get one Live_sessions
     * const live_sessions = await prisma.live_sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends live_sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, live_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Live_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsFindFirstArgs} args - Arguments to find a Live_sessions
     * @example
     * // Get one Live_sessions
     * const live_sessions = await prisma.live_sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends live_sessionsFindFirstArgs>(args?: SelectSubset<T, live_sessionsFindFirstArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Live_sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsFindFirstOrThrowArgs} args - Arguments to find a Live_sessions
     * @example
     * // Get one Live_sessions
     * const live_sessions = await prisma.live_sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends live_sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, live_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Live_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Live_sessions
     * const live_sessions = await prisma.live_sessions.findMany()
     * 
     * // Get first 10 Live_sessions
     * const live_sessions = await prisma.live_sessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const live_sessionsWithIdOnly = await prisma.live_sessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends live_sessionsFindManyArgs>(args?: SelectSubset<T, live_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Live_sessions.
     * @param {live_sessionsCreateArgs} args - Arguments to create a Live_sessions.
     * @example
     * // Create one Live_sessions
     * const Live_sessions = await prisma.live_sessions.create({
     *   data: {
     *     // ... data to create a Live_sessions
     *   }
     * })
     * 
     */
    create<T extends live_sessionsCreateArgs>(args: SelectSubset<T, live_sessionsCreateArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Live_sessions.
     * @param {live_sessionsCreateManyArgs} args - Arguments to create many Live_sessions.
     * @example
     * // Create many Live_sessions
     * const live_sessions = await prisma.live_sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends live_sessionsCreateManyArgs>(args?: SelectSubset<T, live_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Live_sessions and returns the data saved in the database.
     * @param {live_sessionsCreateManyAndReturnArgs} args - Arguments to create many Live_sessions.
     * @example
     * // Create many Live_sessions
     * const live_sessions = await prisma.live_sessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Live_sessions and only return the `id`
     * const live_sessionsWithIdOnly = await prisma.live_sessions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends live_sessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, live_sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Live_sessions.
     * @param {live_sessionsDeleteArgs} args - Arguments to delete one Live_sessions.
     * @example
     * // Delete one Live_sessions
     * const Live_sessions = await prisma.live_sessions.delete({
     *   where: {
     *     // ... filter to delete one Live_sessions
     *   }
     * })
     * 
     */
    delete<T extends live_sessionsDeleteArgs>(args: SelectSubset<T, live_sessionsDeleteArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Live_sessions.
     * @param {live_sessionsUpdateArgs} args - Arguments to update one Live_sessions.
     * @example
     * // Update one Live_sessions
     * const live_sessions = await prisma.live_sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends live_sessionsUpdateArgs>(args: SelectSubset<T, live_sessionsUpdateArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Live_sessions.
     * @param {live_sessionsDeleteManyArgs} args - Arguments to filter Live_sessions to delete.
     * @example
     * // Delete a few Live_sessions
     * const { count } = await prisma.live_sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends live_sessionsDeleteManyArgs>(args?: SelectSubset<T, live_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Live_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Live_sessions
     * const live_sessions = await prisma.live_sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends live_sessionsUpdateManyArgs>(args: SelectSubset<T, live_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Live_sessions and returns the data updated in the database.
     * @param {live_sessionsUpdateManyAndReturnArgs} args - Arguments to update many Live_sessions.
     * @example
     * // Update many Live_sessions
     * const live_sessions = await prisma.live_sessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Live_sessions and only return the `id`
     * const live_sessionsWithIdOnly = await prisma.live_sessions.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends live_sessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, live_sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Live_sessions.
     * @param {live_sessionsUpsertArgs} args - Arguments to update or create a Live_sessions.
     * @example
     * // Update or create a Live_sessions
     * const live_sessions = await prisma.live_sessions.upsert({
     *   create: {
     *     // ... data to create a Live_sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Live_sessions we want to update
     *   }
     * })
     */
    upsert<T extends live_sessionsUpsertArgs>(args: SelectSubset<T, live_sessionsUpsertArgs<ExtArgs>>): Prisma__live_sessionsClient<$Result.GetResult<Prisma.$live_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Live_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsCountArgs} args - Arguments to filter Live_sessions to count.
     * @example
     * // Count the number of Live_sessions
     * const count = await prisma.live_sessions.count({
     *   where: {
     *     // ... the filter for the Live_sessions we want to count
     *   }
     * })
    **/
    count<T extends live_sessionsCountArgs>(
      args?: Subset<T, live_sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Live_sessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Live_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Live_sessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Live_sessionsAggregateArgs>(args: Subset<T, Live_sessionsAggregateArgs>): Prisma.PrismaPromise<GetLive_sessionsAggregateType<T>>

    /**
     * Group by Live_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {live_sessionsGroupByArgs} args - Group by arguments.
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
      T extends live_sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: live_sessionsGroupByArgs['orderBy'] }
        : { orderBy?: live_sessionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, live_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLive_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the live_sessions model
   */
  readonly fields: live_sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for live_sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__live_sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the live_sessions model
   */
  interface live_sessionsFieldRefs {
    readonly id: FieldRef<"live_sessions", 'Int'>
    readonly created_at: FieldRef<"live_sessions", 'DateTime'>
    readonly updated_at: FieldRef<"live_sessions", 'DateTime'>
    readonly deleted_at: FieldRef<"live_sessions", 'DateTime'>
    readonly link: FieldRef<"live_sessions", 'String'>
    readonly origin: FieldRef<"live_sessions", 'OriginSession'>
    readonly prize: FieldRef<"live_sessions", 'BingoPrize'>
  }
    

  // Custom InputTypes
  /**
   * live_sessions findUnique
   */
  export type live_sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter, which live_sessions to fetch.
     */
    where: live_sessionsWhereUniqueInput
  }

  /**
   * live_sessions findUniqueOrThrow
   */
  export type live_sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter, which live_sessions to fetch.
     */
    where: live_sessionsWhereUniqueInput
  }

  /**
   * live_sessions findFirst
   */
  export type live_sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter, which live_sessions to fetch.
     */
    where?: live_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of live_sessions to fetch.
     */
    orderBy?: live_sessionsOrderByWithRelationInput | live_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for live_sessions.
     */
    cursor?: live_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` live_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` live_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of live_sessions.
     */
    distinct?: Live_sessionsScalarFieldEnum | Live_sessionsScalarFieldEnum[]
  }

  /**
   * live_sessions findFirstOrThrow
   */
  export type live_sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter, which live_sessions to fetch.
     */
    where?: live_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of live_sessions to fetch.
     */
    orderBy?: live_sessionsOrderByWithRelationInput | live_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for live_sessions.
     */
    cursor?: live_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` live_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` live_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of live_sessions.
     */
    distinct?: Live_sessionsScalarFieldEnum | Live_sessionsScalarFieldEnum[]
  }

  /**
   * live_sessions findMany
   */
  export type live_sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter, which live_sessions to fetch.
     */
    where?: live_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of live_sessions to fetch.
     */
    orderBy?: live_sessionsOrderByWithRelationInput | live_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing live_sessions.
     */
    cursor?: live_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` live_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` live_sessions.
     */
    skip?: number
    distinct?: Live_sessionsScalarFieldEnum | Live_sessionsScalarFieldEnum[]
  }

  /**
   * live_sessions create
   */
  export type live_sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * The data needed to create a live_sessions.
     */
    data: XOR<live_sessionsCreateInput, live_sessionsUncheckedCreateInput>
  }

  /**
   * live_sessions createMany
   */
  export type live_sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many live_sessions.
     */
    data: live_sessionsCreateManyInput | live_sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * live_sessions createManyAndReturn
   */
  export type live_sessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * The data used to create many live_sessions.
     */
    data: live_sessionsCreateManyInput | live_sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * live_sessions update
   */
  export type live_sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * The data needed to update a live_sessions.
     */
    data: XOR<live_sessionsUpdateInput, live_sessionsUncheckedUpdateInput>
    /**
     * Choose, which live_sessions to update.
     */
    where: live_sessionsWhereUniqueInput
  }

  /**
   * live_sessions updateMany
   */
  export type live_sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update live_sessions.
     */
    data: XOR<live_sessionsUpdateManyMutationInput, live_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which live_sessions to update
     */
    where?: live_sessionsWhereInput
    /**
     * Limit how many live_sessions to update.
     */
    limit?: number
  }

  /**
   * live_sessions updateManyAndReturn
   */
  export type live_sessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * The data used to update live_sessions.
     */
    data: XOR<live_sessionsUpdateManyMutationInput, live_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which live_sessions to update
     */
    where?: live_sessionsWhereInput
    /**
     * Limit how many live_sessions to update.
     */
    limit?: number
  }

  /**
   * live_sessions upsert
   */
  export type live_sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * The filter to search for the live_sessions to update in case it exists.
     */
    where: live_sessionsWhereUniqueInput
    /**
     * In case the live_sessions found by the `where` argument doesn't exist, create a new live_sessions with this data.
     */
    create: XOR<live_sessionsCreateInput, live_sessionsUncheckedCreateInput>
    /**
     * In case the live_sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<live_sessionsUpdateInput, live_sessionsUncheckedUpdateInput>
  }

  /**
   * live_sessions delete
   */
  export type live_sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
    /**
     * Filter which live_sessions to delete.
     */
    where: live_sessionsWhereUniqueInput
  }

  /**
   * live_sessions deleteMany
   */
  export type live_sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which live_sessions to delete
     */
    where?: live_sessionsWhereInput
    /**
     * Limit how many live_sessions to delete.
     */
    limit?: number
  }

  /**
   * live_sessions without action
   */
  export type live_sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the live_sessions
     */
    select?: live_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the live_sessions
     */
    omit?: live_sessionsOmit<ExtArgs> | null
  }


  /**
   * Model source_codes
   */

  export type AggregateSource_codes = {
    _count: Source_codesCountAggregateOutputType | null
    _avg: Source_codesAvgAggregateOutputType | null
    _sum: Source_codesSumAggregateOutputType | null
    _min: Source_codesMinAggregateOutputType | null
    _max: Source_codesMaxAggregateOutputType | null
  }

  export type Source_codesAvgAggregateOutputType = {
    id: number | null
  }

  export type Source_codesSumAggregateOutputType = {
    id: number | null
  }

  export type Source_codesMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    code: string | null
    is_available: boolean | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type Source_codesMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    code: string | null
    is_available: boolean | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type Source_codesCountAggregateOutputType = {
    id: number
    created_at: number
    code: number
    is_available: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type Source_codesAvgAggregateInputType = {
    id?: true
  }

  export type Source_codesSumAggregateInputType = {
    id?: true
  }

  export type Source_codesMinAggregateInputType = {
    id?: true
    created_at?: true
    code?: true
    is_available?: true
    updated_at?: true
    deleted_at?: true
  }

  export type Source_codesMaxAggregateInputType = {
    id?: true
    created_at?: true
    code?: true
    is_available?: true
    updated_at?: true
    deleted_at?: true
  }

  export type Source_codesCountAggregateInputType = {
    id?: true
    created_at?: true
    code?: true
    is_available?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type Source_codesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which source_codes to aggregate.
     */
    where?: source_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of source_codes to fetch.
     */
    orderBy?: source_codesOrderByWithRelationInput | source_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: source_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` source_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` source_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned source_codes
    **/
    _count?: true | Source_codesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Source_codesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Source_codesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Source_codesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Source_codesMaxAggregateInputType
  }

  export type GetSource_codesAggregateType<T extends Source_codesAggregateArgs> = {
        [P in keyof T & keyof AggregateSource_codes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource_codes[P]>
      : GetScalarType<T[P], AggregateSource_codes[P]>
  }




  export type source_codesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: source_codesWhereInput
    orderBy?: source_codesOrderByWithAggregationInput | source_codesOrderByWithAggregationInput[]
    by: Source_codesScalarFieldEnum[] | Source_codesScalarFieldEnum
    having?: source_codesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Source_codesCountAggregateInputType | true
    _avg?: Source_codesAvgAggregateInputType
    _sum?: Source_codesSumAggregateInputType
    _min?: Source_codesMinAggregateInputType
    _max?: Source_codesMaxAggregateInputType
  }

  export type Source_codesGroupByOutputType = {
    id: number
    created_at: Date
    code: string | null
    is_available: boolean | null
    updated_at: Date | null
    deleted_at: Date | null
    _count: Source_codesCountAggregateOutputType | null
    _avg: Source_codesAvgAggregateOutputType | null
    _sum: Source_codesSumAggregateOutputType | null
    _min: Source_codesMinAggregateOutputType | null
    _max: Source_codesMaxAggregateOutputType | null
  }

  type GetSource_codesGroupByPayload<T extends source_codesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Source_codesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Source_codesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Source_codesGroupByOutputType[P]>
            : GetScalarType<T[P], Source_codesGroupByOutputType[P]>
        }
      >
    >


  export type source_codesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    code?: boolean
    is_available?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["source_codes"]>

  export type source_codesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    code?: boolean
    is_available?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["source_codes"]>

  export type source_codesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    code?: boolean
    is_available?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["source_codes"]>

  export type source_codesSelectScalar = {
    id?: boolean
    created_at?: boolean
    code?: boolean
    is_available?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type source_codesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "code" | "is_available" | "updated_at" | "deleted_at", ExtArgs["result"]["source_codes"]>

  export type $source_codesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "source_codes"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      code: string | null
      is_available: boolean | null
      updated_at: Date | null
      deleted_at: Date | null
    }, ExtArgs["result"]["source_codes"]>
    composites: {}
  }

  type source_codesGetPayload<S extends boolean | null | undefined | source_codesDefaultArgs> = $Result.GetResult<Prisma.$source_codesPayload, S>

  type source_codesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<source_codesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Source_codesCountAggregateInputType | true
    }

  export interface source_codesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['source_codes'], meta: { name: 'source_codes' } }
    /**
     * Find zero or one Source_codes that matches the filter.
     * @param {source_codesFindUniqueArgs} args - Arguments to find a Source_codes
     * @example
     * // Get one Source_codes
     * const source_codes = await prisma.source_codes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends source_codesFindUniqueArgs>(args: SelectSubset<T, source_codesFindUniqueArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Source_codes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {source_codesFindUniqueOrThrowArgs} args - Arguments to find a Source_codes
     * @example
     * // Get one Source_codes
     * const source_codes = await prisma.source_codes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends source_codesFindUniqueOrThrowArgs>(args: SelectSubset<T, source_codesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source_codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesFindFirstArgs} args - Arguments to find a Source_codes
     * @example
     * // Get one Source_codes
     * const source_codes = await prisma.source_codes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends source_codesFindFirstArgs>(args?: SelectSubset<T, source_codesFindFirstArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source_codes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesFindFirstOrThrowArgs} args - Arguments to find a Source_codes
     * @example
     * // Get one Source_codes
     * const source_codes = await prisma.source_codes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends source_codesFindFirstOrThrowArgs>(args?: SelectSubset<T, source_codesFindFirstOrThrowArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Source_codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Source_codes
     * const source_codes = await prisma.source_codes.findMany()
     * 
     * // Get first 10 Source_codes
     * const source_codes = await prisma.source_codes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const source_codesWithIdOnly = await prisma.source_codes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends source_codesFindManyArgs>(args?: SelectSubset<T, source_codesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Source_codes.
     * @param {source_codesCreateArgs} args - Arguments to create a Source_codes.
     * @example
     * // Create one Source_codes
     * const Source_codes = await prisma.source_codes.create({
     *   data: {
     *     // ... data to create a Source_codes
     *   }
     * })
     * 
     */
    create<T extends source_codesCreateArgs>(args: SelectSubset<T, source_codesCreateArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Source_codes.
     * @param {source_codesCreateManyArgs} args - Arguments to create many Source_codes.
     * @example
     * // Create many Source_codes
     * const source_codes = await prisma.source_codes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends source_codesCreateManyArgs>(args?: SelectSubset<T, source_codesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Source_codes and returns the data saved in the database.
     * @param {source_codesCreateManyAndReturnArgs} args - Arguments to create many Source_codes.
     * @example
     * // Create many Source_codes
     * const source_codes = await prisma.source_codes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Source_codes and only return the `id`
     * const source_codesWithIdOnly = await prisma.source_codes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends source_codesCreateManyAndReturnArgs>(args?: SelectSubset<T, source_codesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Source_codes.
     * @param {source_codesDeleteArgs} args - Arguments to delete one Source_codes.
     * @example
     * // Delete one Source_codes
     * const Source_codes = await prisma.source_codes.delete({
     *   where: {
     *     // ... filter to delete one Source_codes
     *   }
     * })
     * 
     */
    delete<T extends source_codesDeleteArgs>(args: SelectSubset<T, source_codesDeleteArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Source_codes.
     * @param {source_codesUpdateArgs} args - Arguments to update one Source_codes.
     * @example
     * // Update one Source_codes
     * const source_codes = await prisma.source_codes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends source_codesUpdateArgs>(args: SelectSubset<T, source_codesUpdateArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Source_codes.
     * @param {source_codesDeleteManyArgs} args - Arguments to filter Source_codes to delete.
     * @example
     * // Delete a few Source_codes
     * const { count } = await prisma.source_codes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends source_codesDeleteManyArgs>(args?: SelectSubset<T, source_codesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Source_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Source_codes
     * const source_codes = await prisma.source_codes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends source_codesUpdateManyArgs>(args: SelectSubset<T, source_codesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Source_codes and returns the data updated in the database.
     * @param {source_codesUpdateManyAndReturnArgs} args - Arguments to update many Source_codes.
     * @example
     * // Update many Source_codes
     * const source_codes = await prisma.source_codes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Source_codes and only return the `id`
     * const source_codesWithIdOnly = await prisma.source_codes.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends source_codesUpdateManyAndReturnArgs>(args: SelectSubset<T, source_codesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Source_codes.
     * @param {source_codesUpsertArgs} args - Arguments to update or create a Source_codes.
     * @example
     * // Update or create a Source_codes
     * const source_codes = await prisma.source_codes.upsert({
     *   create: {
     *     // ... data to create a Source_codes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source_codes we want to update
     *   }
     * })
     */
    upsert<T extends source_codesUpsertArgs>(args: SelectSubset<T, source_codesUpsertArgs<ExtArgs>>): Prisma__source_codesClient<$Result.GetResult<Prisma.$source_codesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Source_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesCountArgs} args - Arguments to filter Source_codes to count.
     * @example
     * // Count the number of Source_codes
     * const count = await prisma.source_codes.count({
     *   where: {
     *     // ... the filter for the Source_codes we want to count
     *   }
     * })
    **/
    count<T extends source_codesCountArgs>(
      args?: Subset<T, source_codesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Source_codesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Source_codesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Source_codesAggregateArgs>(args: Subset<T, Source_codesAggregateArgs>): Prisma.PrismaPromise<GetSource_codesAggregateType<T>>

    /**
     * Group by Source_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {source_codesGroupByArgs} args - Group by arguments.
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
      T extends source_codesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: source_codesGroupByArgs['orderBy'] }
        : { orderBy?: source_codesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, source_codesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSource_codesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the source_codes model
   */
  readonly fields: source_codesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for source_codes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__source_codesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the source_codes model
   */
  interface source_codesFieldRefs {
    readonly id: FieldRef<"source_codes", 'Int'>
    readonly created_at: FieldRef<"source_codes", 'DateTime'>
    readonly code: FieldRef<"source_codes", 'String'>
    readonly is_available: FieldRef<"source_codes", 'Boolean'>
    readonly updated_at: FieldRef<"source_codes", 'DateTime'>
    readonly deleted_at: FieldRef<"source_codes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * source_codes findUnique
   */
  export type source_codesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter, which source_codes to fetch.
     */
    where: source_codesWhereUniqueInput
  }

  /**
   * source_codes findUniqueOrThrow
   */
  export type source_codesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter, which source_codes to fetch.
     */
    where: source_codesWhereUniqueInput
  }

  /**
   * source_codes findFirst
   */
  export type source_codesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter, which source_codes to fetch.
     */
    where?: source_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of source_codes to fetch.
     */
    orderBy?: source_codesOrderByWithRelationInput | source_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for source_codes.
     */
    cursor?: source_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` source_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` source_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of source_codes.
     */
    distinct?: Source_codesScalarFieldEnum | Source_codesScalarFieldEnum[]
  }

  /**
   * source_codes findFirstOrThrow
   */
  export type source_codesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter, which source_codes to fetch.
     */
    where?: source_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of source_codes to fetch.
     */
    orderBy?: source_codesOrderByWithRelationInput | source_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for source_codes.
     */
    cursor?: source_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` source_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` source_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of source_codes.
     */
    distinct?: Source_codesScalarFieldEnum | Source_codesScalarFieldEnum[]
  }

  /**
   * source_codes findMany
   */
  export type source_codesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter, which source_codes to fetch.
     */
    where?: source_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of source_codes to fetch.
     */
    orderBy?: source_codesOrderByWithRelationInput | source_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing source_codes.
     */
    cursor?: source_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` source_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` source_codes.
     */
    skip?: number
    distinct?: Source_codesScalarFieldEnum | Source_codesScalarFieldEnum[]
  }

  /**
   * source_codes create
   */
  export type source_codesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * The data needed to create a source_codes.
     */
    data?: XOR<source_codesCreateInput, source_codesUncheckedCreateInput>
  }

  /**
   * source_codes createMany
   */
  export type source_codesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many source_codes.
     */
    data: source_codesCreateManyInput | source_codesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * source_codes createManyAndReturn
   */
  export type source_codesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * The data used to create many source_codes.
     */
    data: source_codesCreateManyInput | source_codesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * source_codes update
   */
  export type source_codesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * The data needed to update a source_codes.
     */
    data: XOR<source_codesUpdateInput, source_codesUncheckedUpdateInput>
    /**
     * Choose, which source_codes to update.
     */
    where: source_codesWhereUniqueInput
  }

  /**
   * source_codes updateMany
   */
  export type source_codesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update source_codes.
     */
    data: XOR<source_codesUpdateManyMutationInput, source_codesUncheckedUpdateManyInput>
    /**
     * Filter which source_codes to update
     */
    where?: source_codesWhereInput
    /**
     * Limit how many source_codes to update.
     */
    limit?: number
  }

  /**
   * source_codes updateManyAndReturn
   */
  export type source_codesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * The data used to update source_codes.
     */
    data: XOR<source_codesUpdateManyMutationInput, source_codesUncheckedUpdateManyInput>
    /**
     * Filter which source_codes to update
     */
    where?: source_codesWhereInput
    /**
     * Limit how many source_codes to update.
     */
    limit?: number
  }

  /**
   * source_codes upsert
   */
  export type source_codesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * The filter to search for the source_codes to update in case it exists.
     */
    where: source_codesWhereUniqueInput
    /**
     * In case the source_codes found by the `where` argument doesn't exist, create a new source_codes with this data.
     */
    create: XOR<source_codesCreateInput, source_codesUncheckedCreateInput>
    /**
     * In case the source_codes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<source_codesUpdateInput, source_codesUncheckedUpdateInput>
  }

  /**
   * source_codes delete
   */
  export type source_codesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
    /**
     * Filter which source_codes to delete.
     */
    where: source_codesWhereUniqueInput
  }

  /**
   * source_codes deleteMany
   */
  export type source_codesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which source_codes to delete
     */
    where?: source_codesWhereInput
    /**
     * Limit how many source_codes to delete.
     */
    limit?: number
  }

  /**
   * source_codes without action
   */
  export type source_codesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the source_codes
     */
    select?: source_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the source_codes
     */
    omit?: source_codesOmit<ExtArgs> | null
  }


  /**
   * Model bingo_prizes
   */

  export type AggregateBingo_prizes = {
    _count: Bingo_prizesCountAggregateOutputType | null
    _avg: Bingo_prizesAvgAggregateOutputType | null
    _sum: Bingo_prizesSumAggregateOutputType | null
    _min: Bingo_prizesMinAggregateOutputType | null
    _max: Bingo_prizesMaxAggregateOutputType | null
  }

  export type Bingo_prizesAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type Bingo_prizesSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type Bingo_prizesMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    prize: string | null
    status: $Enums.status | null
    prize_image: string | null
    quantity: number | null
    description: string | null
  }

  export type Bingo_prizesMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    prize: string | null
    status: $Enums.status | null
    prize_image: string | null
    quantity: number | null
    description: string | null
  }

  export type Bingo_prizesCountAggregateOutputType = {
    id: number
    created_at: number
    prize: number
    status: number
    prize_image: number
    quantity: number
    description: number
    _all: number
  }


  export type Bingo_prizesAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type Bingo_prizesSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type Bingo_prizesMinAggregateInputType = {
    id?: true
    created_at?: true
    prize?: true
    status?: true
    prize_image?: true
    quantity?: true
    description?: true
  }

  export type Bingo_prizesMaxAggregateInputType = {
    id?: true
    created_at?: true
    prize?: true
    status?: true
    prize_image?: true
    quantity?: true
    description?: true
  }

  export type Bingo_prizesCountAggregateInputType = {
    id?: true
    created_at?: true
    prize?: true
    status?: true
    prize_image?: true
    quantity?: true
    description?: true
    _all?: true
  }

  export type Bingo_prizesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bingo_prizes to aggregate.
     */
    where?: bingo_prizesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bingo_prizes to fetch.
     */
    orderBy?: bingo_prizesOrderByWithRelationInput | bingo_prizesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bingo_prizesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bingo_prizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bingo_prizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bingo_prizes
    **/
    _count?: true | Bingo_prizesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bingo_prizesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bingo_prizesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bingo_prizesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bingo_prizesMaxAggregateInputType
  }

  export type GetBingo_prizesAggregateType<T extends Bingo_prizesAggregateArgs> = {
        [P in keyof T & keyof AggregateBingo_prizes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBingo_prizes[P]>
      : GetScalarType<T[P], AggregateBingo_prizes[P]>
  }




  export type bingo_prizesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bingo_prizesWhereInput
    orderBy?: bingo_prizesOrderByWithAggregationInput | bingo_prizesOrderByWithAggregationInput[]
    by: Bingo_prizesScalarFieldEnum[] | Bingo_prizesScalarFieldEnum
    having?: bingo_prizesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bingo_prizesCountAggregateInputType | true
    _avg?: Bingo_prizesAvgAggregateInputType
    _sum?: Bingo_prizesSumAggregateInputType
    _min?: Bingo_prizesMinAggregateInputType
    _max?: Bingo_prizesMaxAggregateInputType
  }

  export type Bingo_prizesGroupByOutputType = {
    id: number
    created_at: Date
    prize: string | null
    status: $Enums.status | null
    prize_image: string | null
    quantity: number | null
    description: string | null
    _count: Bingo_prizesCountAggregateOutputType | null
    _avg: Bingo_prizesAvgAggregateOutputType | null
    _sum: Bingo_prizesSumAggregateOutputType | null
    _min: Bingo_prizesMinAggregateOutputType | null
    _max: Bingo_prizesMaxAggregateOutputType | null
  }

  type GetBingo_prizesGroupByPayload<T extends bingo_prizesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bingo_prizesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bingo_prizesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bingo_prizesGroupByOutputType[P]>
            : GetScalarType<T[P], Bingo_prizesGroupByOutputType[P]>
        }
      >
    >


  export type bingo_prizesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    prize?: boolean
    status?: boolean
    prize_image?: boolean
    quantity?: boolean
    description?: boolean
    bingo_cardboards?: boolean | bingo_prizes$bingo_cardboardsArgs<ExtArgs>
    _count?: boolean | Bingo_prizesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bingo_prizes"]>

  export type bingo_prizesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    prize?: boolean
    status?: boolean
    prize_image?: boolean
    quantity?: boolean
    description?: boolean
  }, ExtArgs["result"]["bingo_prizes"]>

  export type bingo_prizesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    prize?: boolean
    status?: boolean
    prize_image?: boolean
    quantity?: boolean
    description?: boolean
  }, ExtArgs["result"]["bingo_prizes"]>

  export type bingo_prizesSelectScalar = {
    id?: boolean
    created_at?: boolean
    prize?: boolean
    status?: boolean
    prize_image?: boolean
    quantity?: boolean
    description?: boolean
  }

  export type bingo_prizesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "prize" | "status" | "prize_image" | "quantity" | "description", ExtArgs["result"]["bingo_prizes"]>
  export type bingo_prizesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bingo_cardboards?: boolean | bingo_prizes$bingo_cardboardsArgs<ExtArgs>
    _count?: boolean | Bingo_prizesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type bingo_prizesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type bingo_prizesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $bingo_prizesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bingo_prizes"
    objects: {
      bingo_cardboards: Prisma.$BingoCardboardsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      prize: string | null
      status: $Enums.status | null
      prize_image: string | null
      quantity: number | null
      description: string | null
    }, ExtArgs["result"]["bingo_prizes"]>
    composites: {}
  }

  type bingo_prizesGetPayload<S extends boolean | null | undefined | bingo_prizesDefaultArgs> = $Result.GetResult<Prisma.$bingo_prizesPayload, S>

  type bingo_prizesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bingo_prizesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bingo_prizesCountAggregateInputType | true
    }

  export interface bingo_prizesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bingo_prizes'], meta: { name: 'bingo_prizes' } }
    /**
     * Find zero or one Bingo_prizes that matches the filter.
     * @param {bingo_prizesFindUniqueArgs} args - Arguments to find a Bingo_prizes
     * @example
     * // Get one Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bingo_prizesFindUniqueArgs>(args: SelectSubset<T, bingo_prizesFindUniqueArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bingo_prizes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bingo_prizesFindUniqueOrThrowArgs} args - Arguments to find a Bingo_prizes
     * @example
     * // Get one Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bingo_prizesFindUniqueOrThrowArgs>(args: SelectSubset<T, bingo_prizesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bingo_prizes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesFindFirstArgs} args - Arguments to find a Bingo_prizes
     * @example
     * // Get one Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bingo_prizesFindFirstArgs>(args?: SelectSubset<T, bingo_prizesFindFirstArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bingo_prizes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesFindFirstOrThrowArgs} args - Arguments to find a Bingo_prizes
     * @example
     * // Get one Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bingo_prizesFindFirstOrThrowArgs>(args?: SelectSubset<T, bingo_prizesFindFirstOrThrowArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bingo_prizes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findMany()
     * 
     * // Get first 10 Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bingo_prizesWithIdOnly = await prisma.bingo_prizes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bingo_prizesFindManyArgs>(args?: SelectSubset<T, bingo_prizesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bingo_prizes.
     * @param {bingo_prizesCreateArgs} args - Arguments to create a Bingo_prizes.
     * @example
     * // Create one Bingo_prizes
     * const Bingo_prizes = await prisma.bingo_prizes.create({
     *   data: {
     *     // ... data to create a Bingo_prizes
     *   }
     * })
     * 
     */
    create<T extends bingo_prizesCreateArgs>(args: SelectSubset<T, bingo_prizesCreateArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bingo_prizes.
     * @param {bingo_prizesCreateManyArgs} args - Arguments to create many Bingo_prizes.
     * @example
     * // Create many Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bingo_prizesCreateManyArgs>(args?: SelectSubset<T, bingo_prizesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bingo_prizes and returns the data saved in the database.
     * @param {bingo_prizesCreateManyAndReturnArgs} args - Arguments to create many Bingo_prizes.
     * @example
     * // Create many Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bingo_prizes and only return the `id`
     * const bingo_prizesWithIdOnly = await prisma.bingo_prizes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bingo_prizesCreateManyAndReturnArgs>(args?: SelectSubset<T, bingo_prizesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bingo_prizes.
     * @param {bingo_prizesDeleteArgs} args - Arguments to delete one Bingo_prizes.
     * @example
     * // Delete one Bingo_prizes
     * const Bingo_prizes = await prisma.bingo_prizes.delete({
     *   where: {
     *     // ... filter to delete one Bingo_prizes
     *   }
     * })
     * 
     */
    delete<T extends bingo_prizesDeleteArgs>(args: SelectSubset<T, bingo_prizesDeleteArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bingo_prizes.
     * @param {bingo_prizesUpdateArgs} args - Arguments to update one Bingo_prizes.
     * @example
     * // Update one Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bingo_prizesUpdateArgs>(args: SelectSubset<T, bingo_prizesUpdateArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bingo_prizes.
     * @param {bingo_prizesDeleteManyArgs} args - Arguments to filter Bingo_prizes to delete.
     * @example
     * // Delete a few Bingo_prizes
     * const { count } = await prisma.bingo_prizes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bingo_prizesDeleteManyArgs>(args?: SelectSubset<T, bingo_prizesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bingo_prizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bingo_prizesUpdateManyArgs>(args: SelectSubset<T, bingo_prizesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bingo_prizes and returns the data updated in the database.
     * @param {bingo_prizesUpdateManyAndReturnArgs} args - Arguments to update many Bingo_prizes.
     * @example
     * // Update many Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bingo_prizes and only return the `id`
     * const bingo_prizesWithIdOnly = await prisma.bingo_prizes.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends bingo_prizesUpdateManyAndReturnArgs>(args: SelectSubset<T, bingo_prizesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bingo_prizes.
     * @param {bingo_prizesUpsertArgs} args - Arguments to update or create a Bingo_prizes.
     * @example
     * // Update or create a Bingo_prizes
     * const bingo_prizes = await prisma.bingo_prizes.upsert({
     *   create: {
     *     // ... data to create a Bingo_prizes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bingo_prizes we want to update
     *   }
     * })
     */
    upsert<T extends bingo_prizesUpsertArgs>(args: SelectSubset<T, bingo_prizesUpsertArgs<ExtArgs>>): Prisma__bingo_prizesClient<$Result.GetResult<Prisma.$bingo_prizesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bingo_prizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesCountArgs} args - Arguments to filter Bingo_prizes to count.
     * @example
     * // Count the number of Bingo_prizes
     * const count = await prisma.bingo_prizes.count({
     *   where: {
     *     // ... the filter for the Bingo_prizes we want to count
     *   }
     * })
    **/
    count<T extends bingo_prizesCountArgs>(
      args?: Subset<T, bingo_prizesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bingo_prizesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bingo_prizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bingo_prizesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bingo_prizesAggregateArgs>(args: Subset<T, Bingo_prizesAggregateArgs>): Prisma.PrismaPromise<GetBingo_prizesAggregateType<T>>

    /**
     * Group by Bingo_prizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bingo_prizesGroupByArgs} args - Group by arguments.
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
      T extends bingo_prizesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bingo_prizesGroupByArgs['orderBy'] }
        : { orderBy?: bingo_prizesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, bingo_prizesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBingo_prizesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bingo_prizes model
   */
  readonly fields: bingo_prizesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bingo_prizes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bingo_prizesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bingo_cardboards<T extends bingo_prizes$bingo_cardboardsArgs<ExtArgs> = {}>(args?: Subset<T, bingo_prizes$bingo_cardboardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BingoCardboardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the bingo_prizes model
   */
  interface bingo_prizesFieldRefs {
    readonly id: FieldRef<"bingo_prizes", 'Int'>
    readonly created_at: FieldRef<"bingo_prizes", 'DateTime'>
    readonly prize: FieldRef<"bingo_prizes", 'String'>
    readonly status: FieldRef<"bingo_prizes", 'status'>
    readonly prize_image: FieldRef<"bingo_prizes", 'String'>
    readonly quantity: FieldRef<"bingo_prizes", 'Int'>
    readonly description: FieldRef<"bingo_prizes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bingo_prizes findUnique
   */
  export type bingo_prizesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter, which bingo_prizes to fetch.
     */
    where: bingo_prizesWhereUniqueInput
  }

  /**
   * bingo_prizes findUniqueOrThrow
   */
  export type bingo_prizesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter, which bingo_prizes to fetch.
     */
    where: bingo_prizesWhereUniqueInput
  }

  /**
   * bingo_prizes findFirst
   */
  export type bingo_prizesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter, which bingo_prizes to fetch.
     */
    where?: bingo_prizesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bingo_prizes to fetch.
     */
    orderBy?: bingo_prizesOrderByWithRelationInput | bingo_prizesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bingo_prizes.
     */
    cursor?: bingo_prizesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bingo_prizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bingo_prizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bingo_prizes.
     */
    distinct?: Bingo_prizesScalarFieldEnum | Bingo_prizesScalarFieldEnum[]
  }

  /**
   * bingo_prizes findFirstOrThrow
   */
  export type bingo_prizesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter, which bingo_prizes to fetch.
     */
    where?: bingo_prizesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bingo_prizes to fetch.
     */
    orderBy?: bingo_prizesOrderByWithRelationInput | bingo_prizesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bingo_prizes.
     */
    cursor?: bingo_prizesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bingo_prizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bingo_prizes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bingo_prizes.
     */
    distinct?: Bingo_prizesScalarFieldEnum | Bingo_prizesScalarFieldEnum[]
  }

  /**
   * bingo_prizes findMany
   */
  export type bingo_prizesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter, which bingo_prizes to fetch.
     */
    where?: bingo_prizesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bingo_prizes to fetch.
     */
    orderBy?: bingo_prizesOrderByWithRelationInput | bingo_prizesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bingo_prizes.
     */
    cursor?: bingo_prizesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bingo_prizes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bingo_prizes.
     */
    skip?: number
    distinct?: Bingo_prizesScalarFieldEnum | Bingo_prizesScalarFieldEnum[]
  }

  /**
   * bingo_prizes create
   */
  export type bingo_prizesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * The data needed to create a bingo_prizes.
     */
    data?: XOR<bingo_prizesCreateInput, bingo_prizesUncheckedCreateInput>
  }

  /**
   * bingo_prizes createMany
   */
  export type bingo_prizesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bingo_prizes.
     */
    data: bingo_prizesCreateManyInput | bingo_prizesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bingo_prizes createManyAndReturn
   */
  export type bingo_prizesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * The data used to create many bingo_prizes.
     */
    data: bingo_prizesCreateManyInput | bingo_prizesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bingo_prizes update
   */
  export type bingo_prizesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * The data needed to update a bingo_prizes.
     */
    data: XOR<bingo_prizesUpdateInput, bingo_prizesUncheckedUpdateInput>
    /**
     * Choose, which bingo_prizes to update.
     */
    where: bingo_prizesWhereUniqueInput
  }

  /**
   * bingo_prizes updateMany
   */
  export type bingo_prizesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bingo_prizes.
     */
    data: XOR<bingo_prizesUpdateManyMutationInput, bingo_prizesUncheckedUpdateManyInput>
    /**
     * Filter which bingo_prizes to update
     */
    where?: bingo_prizesWhereInput
    /**
     * Limit how many bingo_prizes to update.
     */
    limit?: number
  }

  /**
   * bingo_prizes updateManyAndReturn
   */
  export type bingo_prizesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * The data used to update bingo_prizes.
     */
    data: XOR<bingo_prizesUpdateManyMutationInput, bingo_prizesUncheckedUpdateManyInput>
    /**
     * Filter which bingo_prizes to update
     */
    where?: bingo_prizesWhereInput
    /**
     * Limit how many bingo_prizes to update.
     */
    limit?: number
  }

  /**
   * bingo_prizes upsert
   */
  export type bingo_prizesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * The filter to search for the bingo_prizes to update in case it exists.
     */
    where: bingo_prizesWhereUniqueInput
    /**
     * In case the bingo_prizes found by the `where` argument doesn't exist, create a new bingo_prizes with this data.
     */
    create: XOR<bingo_prizesCreateInput, bingo_prizesUncheckedCreateInput>
    /**
     * In case the bingo_prizes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bingo_prizesUpdateInput, bingo_prizesUncheckedUpdateInput>
  }

  /**
   * bingo_prizes delete
   */
  export type bingo_prizesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
    /**
     * Filter which bingo_prizes to delete.
     */
    where: bingo_prizesWhereUniqueInput
  }

  /**
   * bingo_prizes deleteMany
   */
  export type bingo_prizesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bingo_prizes to delete
     */
    where?: bingo_prizesWhereInput
    /**
     * Limit how many bingo_prizes to delete.
     */
    limit?: number
  }

  /**
   * bingo_prizes.bingo_cardboards
   */
  export type bingo_prizes$bingo_cardboardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BingoCardboards
     */
    select?: BingoCardboardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BingoCardboards
     */
    omit?: BingoCardboardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BingoCardboardsInclude<ExtArgs> | null
    where?: BingoCardboardsWhereInput
    orderBy?: BingoCardboardsOrderByWithRelationInput | BingoCardboardsOrderByWithRelationInput[]
    cursor?: BingoCardboardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BingoCardboardsScalarFieldEnum | BingoCardboardsScalarFieldEnum[]
  }

  /**
   * bingo_prizes without action
   */
  export type bingo_prizesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bingo_prizes
     */
    select?: bingo_prizesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bingo_prizes
     */
    omit?: bingo_prizesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bingo_prizesInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    names: 'names',
    last_names: 'last_names',
    email: 'email',
    password: 'password',
    role: 'role',
    phone_number: 'phone_number',
    account_owner_name: 'account_owner_name',
    account_owner_dni: 'account_owner_dni',
    account_number: 'account_number',
    bank_name: 'bank_name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    code_verification: 'code_verification',
    change_password: 'change_password',
    is_verified: 'is_verified',
    dni: 'dni'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CodesScalarFieldEnum: {
    id: 'id',
    code: 'code',
    origin: 'origin',
    used_for: 'used_for',
    user_id: 'user_id',
    is_used: 'is_used',
    cost: 'cost',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    used_date: 'used_date'
  };

  export type CodesScalarFieldEnum = (typeof CodesScalarFieldEnum)[keyof typeof CodesScalarFieldEnum]


  export const ParametersScalarFieldEnum: {
    id: 'id',
    cost_per_code: 'cost_per_code',
    min_participants_for_bingo: 'min_participants_for_bingo',
    cardboard_per_code: 'cardboard_per_code',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    last_modified_by_id: 'last_modified_by_id',
    bingo_prizes: 'bingo_prizes'
  };

  export type ParametersScalarFieldEnum = (typeof ParametersScalarFieldEnum)[keyof typeof ParametersScalarFieldEnum]


  export const BingoScalarFieldEnum: {
    id: 'id',
    number_of_participants: 'number_of_participants',
    cardboard_by_code: 'cardboard_by_code',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    is_started: 'is_started',
    min_number_of_participants: 'min_number_of_participants',
    winners: 'winners',
    bingo_prizes: 'bingo_prizes',
    numbers_played: 'numbers_played',
    is_finished: 'is_finished'
  };

  export type BingoScalarFieldEnum = (typeof BingoScalarFieldEnum)[keyof typeof BingoScalarFieldEnum]


  export const BingoCardboardsScalarFieldEnum: {
    id: 'id',
    code_id: 'code_id',
    bingo_id: 'bingo_id',
    is_winner: 'is_winner',
    user_id: 'user_id',
    bingo_data_json: 'bingo_data_json',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    prize_id: 'prize_id'
  };

  export type BingoCardboardsScalarFieldEnum = (typeof BingoCardboardsScalarFieldEnum)[keyof typeof BingoCardboardsScalarFieldEnum]


  export const Live_sessionsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    link: 'link',
    origin: 'origin',
    prize: 'prize'
  };

  export type Live_sessionsScalarFieldEnum = (typeof Live_sessionsScalarFieldEnum)[keyof typeof Live_sessionsScalarFieldEnum]


  export const Source_codesScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    code: 'code',
    is_available: 'is_available',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type Source_codesScalarFieldEnum = (typeof Source_codesScalarFieldEnum)[keyof typeof Source_codesScalarFieldEnum]


  export const Bingo_prizesScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    prize: 'prize',
    status: 'status',
    prize_image: 'prize_image',
    quantity: 'quantity',
    description: 'description'
  };

  export type Bingo_prizesScalarFieldEnum = (typeof Bingo_prizesScalarFieldEnum)[keyof typeof Bingo_prizesScalarFieldEnum]


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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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
   * Reference to a field of type 'OriginCodes'
   */
  export type EnumOriginCodesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OriginCodes'>
    


  /**
   * Reference to a field of type 'OriginCodes[]'
   */
  export type ListEnumOriginCodesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OriginCodes[]'>
    


  /**
   * Reference to a field of type 'UsedCodeFor'
   */
  export type EnumUsedCodeForFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsedCodeFor'>
    


  /**
   * Reference to a field of type 'UsedCodeFor[]'
   */
  export type ListEnumUsedCodeForFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsedCodeFor[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'OriginSession'
   */
  export type EnumOriginSessionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OriginSession'>
    


  /**
   * Reference to a field of type 'OriginSession[]'
   */
  export type ListEnumOriginSessionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OriginSession[]'>
    


  /**
   * Reference to a field of type 'BingoPrize'
   */
  export type EnumBingoPrizeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BingoPrize'>
    


  /**
   * Reference to a field of type 'BingoPrize[]'
   */
  export type ListEnumBingoPrizeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BingoPrize[]'>
    


  /**
   * Reference to a field of type 'status'
   */
  export type EnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status'>
    


  /**
   * Reference to a field of type 'status[]'
   */
  export type ListEnumstatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'status[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    names?: StringFilter<"User"> | string
    last_names?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    phone_number?: StringNullableFilter<"User"> | string | null
    account_owner_name?: StringNullableFilter<"User"> | string | null
    account_owner_dni?: StringNullableFilter<"User"> | string | null
    account_number?: StringNullableFilter<"User"> | string | null
    bank_name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    code_verification?: StringNullableFilter<"User"> | string | null
    change_password?: BoolNullableFilter<"User"> | boolean | null
    is_verified?: BoolNullableFilter<"User"> | boolean | null
    dni?: StringNullableFilter<"User"> | string | null
    BingoCardboards?: BingoCardboardsListRelationFilter
    Codes?: CodesListRelationFilter
    Parameters?: ParametersListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    names?: SortOrder
    last_names?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    account_owner_name?: SortOrderInput | SortOrder
    account_owner_dni?: SortOrderInput | SortOrder
    account_number?: SortOrderInput | SortOrder
    bank_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    code_verification?: SortOrderInput | SortOrder
    change_password?: SortOrderInput | SortOrder
    is_verified?: SortOrderInput | SortOrder
    dni?: SortOrderInput | SortOrder
    BingoCardboards?: BingoCardboardsOrderByRelationAggregateInput
    Codes?: CodesOrderByRelationAggregateInput
    Parameters?: ParametersOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    phone_number?: string
    dni?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    names?: StringFilter<"User"> | string
    last_names?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    account_owner_name?: StringNullableFilter<"User"> | string | null
    account_owner_dni?: StringNullableFilter<"User"> | string | null
    account_number?: StringNullableFilter<"User"> | string | null
    bank_name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    code_verification?: StringNullableFilter<"User"> | string | null
    change_password?: BoolNullableFilter<"User"> | boolean | null
    is_verified?: BoolNullableFilter<"User"> | boolean | null
    BingoCardboards?: BingoCardboardsListRelationFilter
    Codes?: CodesListRelationFilter
    Parameters?: ParametersListRelationFilter
  }, "id" | "email" | "phone_number" | "dni">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    names?: SortOrder
    last_names?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    account_owner_name?: SortOrderInput | SortOrder
    account_owner_dni?: SortOrderInput | SortOrder
    account_number?: SortOrderInput | SortOrder
    bank_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    code_verification?: SortOrderInput | SortOrder
    change_password?: SortOrderInput | SortOrder
    is_verified?: SortOrderInput | SortOrder
    dni?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    names?: StringWithAggregatesFilter<"User"> | string
    last_names?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    phone_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    account_owner_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    account_owner_dni?: StringNullableWithAggregatesFilter<"User"> | string | null
    account_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    bank_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    code_verification?: StringNullableWithAggregatesFilter<"User"> | string | null
    change_password?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    is_verified?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    dni?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type CodesWhereInput = {
    AND?: CodesWhereInput | CodesWhereInput[]
    OR?: CodesWhereInput[]
    NOT?: CodesWhereInput | CodesWhereInput[]
    id?: IntFilter<"Codes"> | number
    code?: StringFilter<"Codes"> | string
    origin?: EnumOriginCodesFilter<"Codes"> | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFilter<"Codes"> | $Enums.UsedCodeFor
    user_id?: IntFilter<"Codes"> | number
    is_used?: BoolFilter<"Codes"> | boolean
    cost?: FloatNullableFilter<"Codes"> | number | null
    created_at?: DateTimeFilter<"Codes"> | Date | string
    updated_at?: DateTimeFilter<"Codes"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Codes"> | Date | string | null
    used_date?: DateTimeNullableFilter<"Codes"> | Date | string | null
    BingoCardboards?: BingoCardboardsListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CodesOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    origin?: SortOrder
    used_for?: SortOrder
    user_id?: SortOrder
    is_used?: SortOrder
    cost?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    used_date?: SortOrderInput | SortOrder
    BingoCardboards?: BingoCardboardsOrderByRelationAggregateInput
    User?: UserOrderByWithRelationInput
  }

  export type CodesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: CodesWhereInput | CodesWhereInput[]
    OR?: CodesWhereInput[]
    NOT?: CodesWhereInput | CodesWhereInput[]
    origin?: EnumOriginCodesFilter<"Codes"> | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFilter<"Codes"> | $Enums.UsedCodeFor
    user_id?: IntFilter<"Codes"> | number
    is_used?: BoolFilter<"Codes"> | boolean
    cost?: FloatNullableFilter<"Codes"> | number | null
    created_at?: DateTimeFilter<"Codes"> | Date | string
    updated_at?: DateTimeFilter<"Codes"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Codes"> | Date | string | null
    used_date?: DateTimeNullableFilter<"Codes"> | Date | string | null
    BingoCardboards?: BingoCardboardsListRelationFilter
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "code">

  export type CodesOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    origin?: SortOrder
    used_for?: SortOrder
    user_id?: SortOrder
    is_used?: SortOrder
    cost?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    used_date?: SortOrderInput | SortOrder
    _count?: CodesCountOrderByAggregateInput
    _avg?: CodesAvgOrderByAggregateInput
    _max?: CodesMaxOrderByAggregateInput
    _min?: CodesMinOrderByAggregateInput
    _sum?: CodesSumOrderByAggregateInput
  }

  export type CodesScalarWhereWithAggregatesInput = {
    AND?: CodesScalarWhereWithAggregatesInput | CodesScalarWhereWithAggregatesInput[]
    OR?: CodesScalarWhereWithAggregatesInput[]
    NOT?: CodesScalarWhereWithAggregatesInput | CodesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Codes"> | number
    code?: StringWithAggregatesFilter<"Codes"> | string
    origin?: EnumOriginCodesWithAggregatesFilter<"Codes"> | $Enums.OriginCodes
    used_for?: EnumUsedCodeForWithAggregatesFilter<"Codes"> | $Enums.UsedCodeFor
    user_id?: IntWithAggregatesFilter<"Codes"> | number
    is_used?: BoolWithAggregatesFilter<"Codes"> | boolean
    cost?: FloatNullableWithAggregatesFilter<"Codes"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Codes"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Codes"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Codes"> | Date | string | null
    used_date?: DateTimeNullableWithAggregatesFilter<"Codes"> | Date | string | null
  }

  export type ParametersWhereInput = {
    AND?: ParametersWhereInput | ParametersWhereInput[]
    OR?: ParametersWhereInput[]
    NOT?: ParametersWhereInput | ParametersWhereInput[]
    id?: IntFilter<"Parameters"> | number
    cost_per_code?: FloatFilter<"Parameters"> | number
    min_participants_for_bingo?: IntFilter<"Parameters"> | number
    cardboard_per_code?: IntFilter<"Parameters"> | number
    created_at?: DateTimeFilter<"Parameters"> | Date | string
    updated_at?: DateTimeFilter<"Parameters"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Parameters"> | Date | string | null
    last_modified_by_id?: IntNullableFilter<"Parameters"> | number | null
    bingo_prizes?: JsonNullableFilter<"Parameters">
    last_modified_by?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ParametersOrderByWithRelationInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    last_modified_by_id?: SortOrderInput | SortOrder
    bingo_prizes?: SortOrderInput | SortOrder
    last_modified_by?: UserOrderByWithRelationInput
  }

  export type ParametersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ParametersWhereInput | ParametersWhereInput[]
    OR?: ParametersWhereInput[]
    NOT?: ParametersWhereInput | ParametersWhereInput[]
    cost_per_code?: FloatFilter<"Parameters"> | number
    min_participants_for_bingo?: IntFilter<"Parameters"> | number
    cardboard_per_code?: IntFilter<"Parameters"> | number
    created_at?: DateTimeFilter<"Parameters"> | Date | string
    updated_at?: DateTimeFilter<"Parameters"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Parameters"> | Date | string | null
    last_modified_by_id?: IntNullableFilter<"Parameters"> | number | null
    bingo_prizes?: JsonNullableFilter<"Parameters">
    last_modified_by?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ParametersOrderByWithAggregationInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    last_modified_by_id?: SortOrderInput | SortOrder
    bingo_prizes?: SortOrderInput | SortOrder
    _count?: ParametersCountOrderByAggregateInput
    _avg?: ParametersAvgOrderByAggregateInput
    _max?: ParametersMaxOrderByAggregateInput
    _min?: ParametersMinOrderByAggregateInput
    _sum?: ParametersSumOrderByAggregateInput
  }

  export type ParametersScalarWhereWithAggregatesInput = {
    AND?: ParametersScalarWhereWithAggregatesInput | ParametersScalarWhereWithAggregatesInput[]
    OR?: ParametersScalarWhereWithAggregatesInput[]
    NOT?: ParametersScalarWhereWithAggregatesInput | ParametersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Parameters"> | number
    cost_per_code?: FloatWithAggregatesFilter<"Parameters"> | number
    min_participants_for_bingo?: IntWithAggregatesFilter<"Parameters"> | number
    cardboard_per_code?: IntWithAggregatesFilter<"Parameters"> | number
    created_at?: DateTimeWithAggregatesFilter<"Parameters"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Parameters"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Parameters"> | Date | string | null
    last_modified_by_id?: IntNullableWithAggregatesFilter<"Parameters"> | number | null
    bingo_prizes?: JsonNullableWithAggregatesFilter<"Parameters">
  }

  export type BingoWhereInput = {
    AND?: BingoWhereInput | BingoWhereInput[]
    OR?: BingoWhereInput[]
    NOT?: BingoWhereInput | BingoWhereInput[]
    id?: IntFilter<"Bingo"> | number
    number_of_participants?: IntFilter<"Bingo"> | number
    cardboard_by_code?: IntFilter<"Bingo"> | number
    created_at?: DateTimeFilter<"Bingo"> | Date | string
    updated_at?: DateTimeFilter<"Bingo"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Bingo"> | Date | string | null
    is_started?: BoolFilter<"Bingo"> | boolean
    min_number_of_participants?: IntNullableFilter<"Bingo"> | number | null
    winners?: JsonNullableFilter<"Bingo">
    bingo_prizes?: JsonNullableFilter<"Bingo">
    numbers_played?: JsonNullableFilter<"Bingo">
    is_finished?: BoolNullableFilter<"Bingo"> | boolean | null
    BingoCardboards?: BingoCardboardsListRelationFilter
  }

  export type BingoOrderByWithRelationInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    is_started?: SortOrder
    min_number_of_participants?: SortOrderInput | SortOrder
    winners?: SortOrderInput | SortOrder
    bingo_prizes?: SortOrderInput | SortOrder
    numbers_played?: SortOrderInput | SortOrder
    is_finished?: SortOrderInput | SortOrder
    BingoCardboards?: BingoCardboardsOrderByRelationAggregateInput
  }

  export type BingoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BingoWhereInput | BingoWhereInput[]
    OR?: BingoWhereInput[]
    NOT?: BingoWhereInput | BingoWhereInput[]
    number_of_participants?: IntFilter<"Bingo"> | number
    cardboard_by_code?: IntFilter<"Bingo"> | number
    created_at?: DateTimeFilter<"Bingo"> | Date | string
    updated_at?: DateTimeFilter<"Bingo"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Bingo"> | Date | string | null
    is_started?: BoolFilter<"Bingo"> | boolean
    min_number_of_participants?: IntNullableFilter<"Bingo"> | number | null
    winners?: JsonNullableFilter<"Bingo">
    bingo_prizes?: JsonNullableFilter<"Bingo">
    numbers_played?: JsonNullableFilter<"Bingo">
    is_finished?: BoolNullableFilter<"Bingo"> | boolean | null
    BingoCardboards?: BingoCardboardsListRelationFilter
  }, "id">

  export type BingoOrderByWithAggregationInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    is_started?: SortOrder
    min_number_of_participants?: SortOrderInput | SortOrder
    winners?: SortOrderInput | SortOrder
    bingo_prizes?: SortOrderInput | SortOrder
    numbers_played?: SortOrderInput | SortOrder
    is_finished?: SortOrderInput | SortOrder
    _count?: BingoCountOrderByAggregateInput
    _avg?: BingoAvgOrderByAggregateInput
    _max?: BingoMaxOrderByAggregateInput
    _min?: BingoMinOrderByAggregateInput
    _sum?: BingoSumOrderByAggregateInput
  }

  export type BingoScalarWhereWithAggregatesInput = {
    AND?: BingoScalarWhereWithAggregatesInput | BingoScalarWhereWithAggregatesInput[]
    OR?: BingoScalarWhereWithAggregatesInput[]
    NOT?: BingoScalarWhereWithAggregatesInput | BingoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Bingo"> | number
    number_of_participants?: IntWithAggregatesFilter<"Bingo"> | number
    cardboard_by_code?: IntWithAggregatesFilter<"Bingo"> | number
    created_at?: DateTimeWithAggregatesFilter<"Bingo"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Bingo"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Bingo"> | Date | string | null
    is_started?: BoolWithAggregatesFilter<"Bingo"> | boolean
    min_number_of_participants?: IntNullableWithAggregatesFilter<"Bingo"> | number | null
    winners?: JsonNullableWithAggregatesFilter<"Bingo">
    bingo_prizes?: JsonNullableWithAggregatesFilter<"Bingo">
    numbers_played?: JsonNullableWithAggregatesFilter<"Bingo">
    is_finished?: BoolNullableWithAggregatesFilter<"Bingo"> | boolean | null
  }

  export type BingoCardboardsWhereInput = {
    AND?: BingoCardboardsWhereInput | BingoCardboardsWhereInput[]
    OR?: BingoCardboardsWhereInput[]
    NOT?: BingoCardboardsWhereInput | BingoCardboardsWhereInput[]
    id?: IntFilter<"BingoCardboards"> | number
    code_id?: IntFilter<"BingoCardboards"> | number
    bingo_id?: IntFilter<"BingoCardboards"> | number
    is_winner?: BoolFilter<"BingoCardboards"> | boolean
    user_id?: IntFilter<"BingoCardboards"> | number
    bingo_data_json?: JsonFilter<"BingoCardboards">
    created_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    updated_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    deleted_at?: DateTimeNullableFilter<"BingoCardboards"> | Date | string | null
    prize_id?: IntNullableFilter<"BingoCardboards"> | number | null
    bingo?: XOR<BingoScalarRelationFilter, BingoWhereInput>
    Codes?: XOR<CodesScalarRelationFilter, CodesWhereInput>
    bingo_prizes?: XOR<Bingo_prizesNullableScalarRelationFilter, bingo_prizesWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BingoCardboardsOrderByWithRelationInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    is_winner?: SortOrder
    user_id?: SortOrder
    bingo_data_json?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    prize_id?: SortOrderInput | SortOrder
    bingo?: BingoOrderByWithRelationInput
    Codes?: CodesOrderByWithRelationInput
    bingo_prizes?: bingo_prizesOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type BingoCardboardsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BingoCardboardsWhereInput | BingoCardboardsWhereInput[]
    OR?: BingoCardboardsWhereInput[]
    NOT?: BingoCardboardsWhereInput | BingoCardboardsWhereInput[]
    code_id?: IntFilter<"BingoCardboards"> | number
    bingo_id?: IntFilter<"BingoCardboards"> | number
    is_winner?: BoolFilter<"BingoCardboards"> | boolean
    user_id?: IntFilter<"BingoCardboards"> | number
    bingo_data_json?: JsonFilter<"BingoCardboards">
    created_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    updated_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    deleted_at?: DateTimeNullableFilter<"BingoCardboards"> | Date | string | null
    prize_id?: IntNullableFilter<"BingoCardboards"> | number | null
    bingo?: XOR<BingoScalarRelationFilter, BingoWhereInput>
    Codes?: XOR<CodesScalarRelationFilter, CodesWhereInput>
    bingo_prizes?: XOR<Bingo_prizesNullableScalarRelationFilter, bingo_prizesWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BingoCardboardsOrderByWithAggregationInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    is_winner?: SortOrder
    user_id?: SortOrder
    bingo_data_json?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    prize_id?: SortOrderInput | SortOrder
    _count?: BingoCardboardsCountOrderByAggregateInput
    _avg?: BingoCardboardsAvgOrderByAggregateInput
    _max?: BingoCardboardsMaxOrderByAggregateInput
    _min?: BingoCardboardsMinOrderByAggregateInput
    _sum?: BingoCardboardsSumOrderByAggregateInput
  }

  export type BingoCardboardsScalarWhereWithAggregatesInput = {
    AND?: BingoCardboardsScalarWhereWithAggregatesInput | BingoCardboardsScalarWhereWithAggregatesInput[]
    OR?: BingoCardboardsScalarWhereWithAggregatesInput[]
    NOT?: BingoCardboardsScalarWhereWithAggregatesInput | BingoCardboardsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BingoCardboards"> | number
    code_id?: IntWithAggregatesFilter<"BingoCardboards"> | number
    bingo_id?: IntWithAggregatesFilter<"BingoCardboards"> | number
    is_winner?: BoolWithAggregatesFilter<"BingoCardboards"> | boolean
    user_id?: IntWithAggregatesFilter<"BingoCardboards"> | number
    bingo_data_json?: JsonWithAggregatesFilter<"BingoCardboards">
    created_at?: DateTimeWithAggregatesFilter<"BingoCardboards"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"BingoCardboards"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"BingoCardboards"> | Date | string | null
    prize_id?: IntNullableWithAggregatesFilter<"BingoCardboards"> | number | null
  }

  export type live_sessionsWhereInput = {
    AND?: live_sessionsWhereInput | live_sessionsWhereInput[]
    OR?: live_sessionsWhereInput[]
    NOT?: live_sessionsWhereInput | live_sessionsWhereInput[]
    id?: IntFilter<"live_sessions"> | number
    created_at?: DateTimeFilter<"live_sessions"> | Date | string
    updated_at?: DateTimeNullableFilter<"live_sessions"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"live_sessions"> | Date | string | null
    link?: StringNullableFilter<"live_sessions"> | string | null
    origin?: EnumOriginSessionFilter<"live_sessions"> | $Enums.OriginSession
    prize?: EnumBingoPrizeFilter<"live_sessions"> | $Enums.BingoPrize
  }

  export type live_sessionsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    origin?: SortOrder
    prize?: SortOrder
  }

  export type live_sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: live_sessionsWhereInput | live_sessionsWhereInput[]
    OR?: live_sessionsWhereInput[]
    NOT?: live_sessionsWhereInput | live_sessionsWhereInput[]
    created_at?: DateTimeFilter<"live_sessions"> | Date | string
    updated_at?: DateTimeNullableFilter<"live_sessions"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"live_sessions"> | Date | string | null
    link?: StringNullableFilter<"live_sessions"> | string | null
    origin?: EnumOriginSessionFilter<"live_sessions"> | $Enums.OriginSession
    prize?: EnumBingoPrizeFilter<"live_sessions"> | $Enums.BingoPrize
  }, "id">

  export type live_sessionsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    origin?: SortOrder
    prize?: SortOrder
    _count?: live_sessionsCountOrderByAggregateInput
    _avg?: live_sessionsAvgOrderByAggregateInput
    _max?: live_sessionsMaxOrderByAggregateInput
    _min?: live_sessionsMinOrderByAggregateInput
    _sum?: live_sessionsSumOrderByAggregateInput
  }

  export type live_sessionsScalarWhereWithAggregatesInput = {
    AND?: live_sessionsScalarWhereWithAggregatesInput | live_sessionsScalarWhereWithAggregatesInput[]
    OR?: live_sessionsScalarWhereWithAggregatesInput[]
    NOT?: live_sessionsScalarWhereWithAggregatesInput | live_sessionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"live_sessions"> | number
    created_at?: DateTimeWithAggregatesFilter<"live_sessions"> | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"live_sessions"> | Date | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"live_sessions"> | Date | string | null
    link?: StringNullableWithAggregatesFilter<"live_sessions"> | string | null
    origin?: EnumOriginSessionWithAggregatesFilter<"live_sessions"> | $Enums.OriginSession
    prize?: EnumBingoPrizeWithAggregatesFilter<"live_sessions"> | $Enums.BingoPrize
  }

  export type source_codesWhereInput = {
    AND?: source_codesWhereInput | source_codesWhereInput[]
    OR?: source_codesWhereInput[]
    NOT?: source_codesWhereInput | source_codesWhereInput[]
    id?: IntFilter<"source_codes"> | number
    created_at?: DateTimeFilter<"source_codes"> | Date | string
    code?: StringNullableFilter<"source_codes"> | string | null
    is_available?: BoolNullableFilter<"source_codes"> | boolean | null
    updated_at?: DateTimeNullableFilter<"source_codes"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"source_codes"> | Date | string | null
  }

  export type source_codesOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    code?: SortOrderInput | SortOrder
    is_available?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
  }

  export type source_codesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: source_codesWhereInput | source_codesWhereInput[]
    OR?: source_codesWhereInput[]
    NOT?: source_codesWhereInput | source_codesWhereInput[]
    created_at?: DateTimeFilter<"source_codes"> | Date | string
    code?: StringNullableFilter<"source_codes"> | string | null
    is_available?: BoolNullableFilter<"source_codes"> | boolean | null
    updated_at?: DateTimeNullableFilter<"source_codes"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"source_codes"> | Date | string | null
  }, "id">

  export type source_codesOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    code?: SortOrderInput | SortOrder
    is_available?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: source_codesCountOrderByAggregateInput
    _avg?: source_codesAvgOrderByAggregateInput
    _max?: source_codesMaxOrderByAggregateInput
    _min?: source_codesMinOrderByAggregateInput
    _sum?: source_codesSumOrderByAggregateInput
  }

  export type source_codesScalarWhereWithAggregatesInput = {
    AND?: source_codesScalarWhereWithAggregatesInput | source_codesScalarWhereWithAggregatesInput[]
    OR?: source_codesScalarWhereWithAggregatesInput[]
    NOT?: source_codesScalarWhereWithAggregatesInput | source_codesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"source_codes"> | number
    created_at?: DateTimeWithAggregatesFilter<"source_codes"> | Date | string
    code?: StringNullableWithAggregatesFilter<"source_codes"> | string | null
    is_available?: BoolNullableWithAggregatesFilter<"source_codes"> | boolean | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"source_codes"> | Date | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"source_codes"> | Date | string | null
  }

  export type bingo_prizesWhereInput = {
    AND?: bingo_prizesWhereInput | bingo_prizesWhereInput[]
    OR?: bingo_prizesWhereInput[]
    NOT?: bingo_prizesWhereInput | bingo_prizesWhereInput[]
    id?: IntFilter<"bingo_prizes"> | number
    created_at?: DateTimeFilter<"bingo_prizes"> | Date | string
    prize?: StringNullableFilter<"bingo_prizes"> | string | null
    status?: EnumstatusNullableFilter<"bingo_prizes"> | $Enums.status | null
    prize_image?: StringNullableFilter<"bingo_prizes"> | string | null
    quantity?: IntNullableFilter<"bingo_prizes"> | number | null
    description?: StringNullableFilter<"bingo_prizes"> | string | null
    bingo_cardboards?: BingoCardboardsListRelationFilter
  }

  export type bingo_prizesOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    prize?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    prize_image?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    bingo_cardboards?: BingoCardboardsOrderByRelationAggregateInput
  }

  export type bingo_prizesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: bingo_prizesWhereInput | bingo_prizesWhereInput[]
    OR?: bingo_prizesWhereInput[]
    NOT?: bingo_prizesWhereInput | bingo_prizesWhereInput[]
    created_at?: DateTimeFilter<"bingo_prizes"> | Date | string
    prize?: StringNullableFilter<"bingo_prizes"> | string | null
    status?: EnumstatusNullableFilter<"bingo_prizes"> | $Enums.status | null
    prize_image?: StringNullableFilter<"bingo_prizes"> | string | null
    quantity?: IntNullableFilter<"bingo_prizes"> | number | null
    description?: StringNullableFilter<"bingo_prizes"> | string | null
    bingo_cardboards?: BingoCardboardsListRelationFilter
  }, "id">

  export type bingo_prizesOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    prize?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    prize_image?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: bingo_prizesCountOrderByAggregateInput
    _avg?: bingo_prizesAvgOrderByAggregateInput
    _max?: bingo_prizesMaxOrderByAggregateInput
    _min?: bingo_prizesMinOrderByAggregateInput
    _sum?: bingo_prizesSumOrderByAggregateInput
  }

  export type bingo_prizesScalarWhereWithAggregatesInput = {
    AND?: bingo_prizesScalarWhereWithAggregatesInput | bingo_prizesScalarWhereWithAggregatesInput[]
    OR?: bingo_prizesScalarWhereWithAggregatesInput[]
    NOT?: bingo_prizesScalarWhereWithAggregatesInput | bingo_prizesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bingo_prizes"> | number
    created_at?: DateTimeWithAggregatesFilter<"bingo_prizes"> | Date | string
    prize?: StringNullableWithAggregatesFilter<"bingo_prizes"> | string | null
    status?: EnumstatusNullableWithAggregatesFilter<"bingo_prizes"> | $Enums.status | null
    prize_image?: StringNullableWithAggregatesFilter<"bingo_prizes"> | string | null
    quantity?: IntNullableWithAggregatesFilter<"bingo_prizes"> | number | null
    description?: StringNullableWithAggregatesFilter<"bingo_prizes"> | string | null
  }

  export type UserCreateInput = {
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutUserInput
    Codes?: CodesCreateNestedManyWithoutUserInput
    Parameters?: ParametersCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutUserInput
    Codes?: CodesUncheckedCreateNestedManyWithoutUserInput
    Parameters?: ParametersUncheckedCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserUpdateInput = {
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutUserNestedInput
    Codes?: CodesUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUpdateManyWithoutLast_modified_byNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutUserNestedInput
    Codes?: CodesUncheckedUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUncheckedUpdateManyWithoutLast_modified_byNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
  }

  export type UserUpdateManyMutationInput = {
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CodesCreateInput = {
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutCodesInput
    User: UserCreateNestedOneWithoutCodesInput
  }

  export type CodesUncheckedCreateInput = {
    id?: number
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    user_id: number
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutCodesInput
  }

  export type CodesUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutCodesNestedInput
    User?: UserUpdateOneRequiredWithoutCodesNestedInput
  }

  export type CodesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    user_id?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutCodesNestedInput
  }

  export type CodesCreateManyInput = {
    id?: number
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    user_id: number
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
  }

  export type CodesUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CodesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    user_id?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParametersCreateInput = {
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    last_modified_by?: UserCreateNestedOneWithoutParametersInput
  }

  export type ParametersUncheckedCreateInput = {
    id?: number
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    last_modified_by_id?: number | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUpdateInput = {
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    last_modified_by?: UserUpdateOneWithoutParametersNestedInput
  }

  export type ParametersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by_id?: NullableIntFieldUpdateOperationsInput | number | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersCreateManyInput = {
    id?: number
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    last_modified_by_id?: number | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUpdateManyMutationInput = {
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by_id?: NullableIntFieldUpdateOperationsInput | number | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type BingoCreateInput = {
    number_of_participants?: number
    cardboard_by_code: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    is_started?: boolean
    min_number_of_participants?: number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: boolean | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutBingoInput
  }

  export type BingoUncheckedCreateInput = {
    id?: number
    number_of_participants?: number
    cardboard_by_code: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    is_started?: boolean
    min_number_of_participants?: number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: boolean | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutBingoInput
  }

  export type BingoUpdateInput = {
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutBingoNestedInput
  }

  export type BingoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutBingoNestedInput
  }

  export type BingoCreateManyInput = {
    id?: number
    number_of_participants?: number
    cardboard_by_code: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    is_started?: boolean
    min_number_of_participants?: number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: boolean | null
  }

  export type BingoUpdateManyMutationInput = {
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BingoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BingoCardboardsCreateInput = {
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo: BingoCreateNestedOneWithoutBingoCardboardsInput
    Codes: CodesCreateNestedOneWithoutBingoCardboardsInput
    bingo_prizes?: bingo_prizesCreateNestedOneWithoutBingo_cardboardsInput
    user: UserCreateNestedOneWithoutBingoCardboardsInput
  }

  export type BingoCardboardsUncheckedCreateInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsUpdateInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo?: BingoUpdateOneRequiredWithoutBingoCardboardsNestedInput
    Codes?: CodesUpdateOneRequiredWithoutBingoCardboardsNestedInput
    bingo_prizes?: bingo_prizesUpdateOneWithoutBingo_cardboardsNestedInput
    user?: UserUpdateOneRequiredWithoutBingoCardboardsNestedInput
  }

  export type BingoCardboardsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsCreateManyInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsUpdateManyMutationInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BingoCardboardsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type live_sessionsCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    link?: string | null
    origin: $Enums.OriginSession
    prize?: $Enums.BingoPrize
  }

  export type live_sessionsUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    link?: string | null
    origin: $Enums.OriginSession
    prize?: $Enums.BingoPrize
  }

  export type live_sessionsUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: EnumOriginSessionFieldUpdateOperationsInput | $Enums.OriginSession
    prize?: EnumBingoPrizeFieldUpdateOperationsInput | $Enums.BingoPrize
  }

  export type live_sessionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: EnumOriginSessionFieldUpdateOperationsInput | $Enums.OriginSession
    prize?: EnumBingoPrizeFieldUpdateOperationsInput | $Enums.BingoPrize
  }

  export type live_sessionsCreateManyInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    link?: string | null
    origin: $Enums.OriginSession
    prize?: $Enums.BingoPrize
  }

  export type live_sessionsUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: EnumOriginSessionFieldUpdateOperationsInput | $Enums.OriginSession
    prize?: EnumBingoPrizeFieldUpdateOperationsInput | $Enums.BingoPrize
  }

  export type live_sessionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: EnumOriginSessionFieldUpdateOperationsInput | $Enums.OriginSession
    prize?: EnumBingoPrizeFieldUpdateOperationsInput | $Enums.BingoPrize
  }

  export type source_codesCreateInput = {
    created_at?: Date | string
    code?: string | null
    is_available?: boolean | null
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type source_codesUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    code?: string | null
    is_available?: boolean | null
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type source_codesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    is_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type source_codesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    is_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type source_codesCreateManyInput = {
    id?: number
    created_at?: Date | string
    code?: string | null
    is_available?: boolean | null
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type source_codesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    is_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type source_codesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    is_available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bingo_prizesCreateInput = {
    created_at?: Date | string
    prize?: string | null
    status?: $Enums.status | null
    prize_image?: string | null
    quantity?: number | null
    description?: string | null
    bingo_cardboards?: BingoCardboardsCreateNestedManyWithoutBingo_prizesInput
  }

  export type bingo_prizesUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    prize?: string | null
    status?: $Enums.status | null
    prize_image?: string | null
    quantity?: number | null
    description?: string | null
    bingo_cardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutBingo_prizesInput
  }

  export type bingo_prizesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    bingo_cardboards?: BingoCardboardsUpdateManyWithoutBingo_prizesNestedInput
  }

  export type bingo_prizesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    bingo_cardboards?: BingoCardboardsUncheckedUpdateManyWithoutBingo_prizesNestedInput
  }

  export type bingo_prizesCreateManyInput = {
    id?: number
    created_at?: Date | string
    prize?: string | null
    status?: $Enums.status | null
    prize_image?: string | null
    quantity?: number | null
    description?: string | null
  }

  export type bingo_prizesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bingo_prizesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BingoCardboardsListRelationFilter = {
    every?: BingoCardboardsWhereInput
    some?: BingoCardboardsWhereInput
    none?: BingoCardboardsWhereInput
  }

  export type CodesListRelationFilter = {
    every?: CodesWhereInput
    some?: CodesWhereInput
    none?: CodesWhereInput
  }

  export type ParametersListRelationFilter = {
    every?: ParametersWhereInput
    some?: ParametersWhereInput
    none?: ParametersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BingoCardboardsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CodesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParametersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    names?: SortOrder
    last_names?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone_number?: SortOrder
    account_owner_name?: SortOrder
    account_owner_dni?: SortOrder
    account_number?: SortOrder
    bank_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    code_verification?: SortOrder
    change_password?: SortOrder
    is_verified?: SortOrder
    dni?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    names?: SortOrder
    last_names?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone_number?: SortOrder
    account_owner_name?: SortOrder
    account_owner_dni?: SortOrder
    account_number?: SortOrder
    bank_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    code_verification?: SortOrder
    change_password?: SortOrder
    is_verified?: SortOrder
    dni?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    names?: SortOrder
    last_names?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone_number?: SortOrder
    account_owner_name?: SortOrder
    account_owner_dni?: SortOrder
    account_number?: SortOrder
    bank_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    code_verification?: SortOrder
    change_password?: SortOrder
    is_verified?: SortOrder
    dni?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumOriginCodesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginCodes | EnumOriginCodesFieldRefInput<$PrismaModel>
    in?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginCodesFilter<$PrismaModel> | $Enums.OriginCodes
  }

  export type EnumUsedCodeForFilter<$PrismaModel = never> = {
    equals?: $Enums.UsedCodeFor | EnumUsedCodeForFieldRefInput<$PrismaModel>
    in?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    not?: NestedEnumUsedCodeForFilter<$PrismaModel> | $Enums.UsedCodeFor
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CodesCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    origin?: SortOrder
    used_for?: SortOrder
    user_id?: SortOrder
    is_used?: SortOrder
    cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    used_date?: SortOrder
  }

  export type CodesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    cost?: SortOrder
  }

  export type CodesMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    origin?: SortOrder
    used_for?: SortOrder
    user_id?: SortOrder
    is_used?: SortOrder
    cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    used_date?: SortOrder
  }

  export type CodesMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    origin?: SortOrder
    used_for?: SortOrder
    user_id?: SortOrder
    is_used?: SortOrder
    cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    used_date?: SortOrder
  }

  export type CodesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    cost?: SortOrder
  }

  export type EnumOriginCodesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginCodes | EnumOriginCodesFieldRefInput<$PrismaModel>
    in?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginCodesWithAggregatesFilter<$PrismaModel> | $Enums.OriginCodes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOriginCodesFilter<$PrismaModel>
    _max?: NestedEnumOriginCodesFilter<$PrismaModel>
  }

  export type EnumUsedCodeForWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsedCodeFor | EnumUsedCodeForFieldRefInput<$PrismaModel>
    in?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    not?: NestedEnumUsedCodeForWithAggregatesFilter<$PrismaModel> | $Enums.UsedCodeFor
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsedCodeForFilter<$PrismaModel>
    _max?: NestedEnumUsedCodeForFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ParametersCountOrderByAggregateInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    last_modified_by_id?: SortOrder
    bingo_prizes?: SortOrder
  }

  export type ParametersAvgOrderByAggregateInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    last_modified_by_id?: SortOrder
  }

  export type ParametersMaxOrderByAggregateInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    last_modified_by_id?: SortOrder
  }

  export type ParametersMinOrderByAggregateInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    last_modified_by_id?: SortOrder
  }

  export type ParametersSumOrderByAggregateInput = {
    id?: SortOrder
    cost_per_code?: SortOrder
    min_participants_for_bingo?: SortOrder
    cardboard_per_code?: SortOrder
    last_modified_by_id?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type BingoCountOrderByAggregateInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_started?: SortOrder
    min_number_of_participants?: SortOrder
    winners?: SortOrder
    bingo_prizes?: SortOrder
    numbers_played?: SortOrder
    is_finished?: SortOrder
  }

  export type BingoAvgOrderByAggregateInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    min_number_of_participants?: SortOrder
  }

  export type BingoMaxOrderByAggregateInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_started?: SortOrder
    min_number_of_participants?: SortOrder
    is_finished?: SortOrder
  }

  export type BingoMinOrderByAggregateInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_started?: SortOrder
    min_number_of_participants?: SortOrder
    is_finished?: SortOrder
  }

  export type BingoSumOrderByAggregateInput = {
    id?: SortOrder
    number_of_participants?: SortOrder
    cardboard_by_code?: SortOrder
    min_number_of_participants?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type BingoScalarRelationFilter = {
    is?: BingoWhereInput
    isNot?: BingoWhereInput
  }

  export type CodesScalarRelationFilter = {
    is?: CodesWhereInput
    isNot?: CodesWhereInput
  }

  export type Bingo_prizesNullableScalarRelationFilter = {
    is?: bingo_prizesWhereInput | null
    isNot?: bingo_prizesWhereInput | null
  }

  export type BingoCardboardsCountOrderByAggregateInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    is_winner?: SortOrder
    user_id?: SortOrder
    bingo_data_json?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    prize_id?: SortOrder
  }

  export type BingoCardboardsAvgOrderByAggregateInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    user_id?: SortOrder
    prize_id?: SortOrder
  }

  export type BingoCardboardsMaxOrderByAggregateInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    is_winner?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    prize_id?: SortOrder
  }

  export type BingoCardboardsMinOrderByAggregateInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    is_winner?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    prize_id?: SortOrder
  }

  export type BingoCardboardsSumOrderByAggregateInput = {
    id?: SortOrder
    code_id?: SortOrder
    bingo_id?: SortOrder
    user_id?: SortOrder
    prize_id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumOriginSessionFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginSession | EnumOriginSessionFieldRefInput<$PrismaModel>
    in?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginSessionFilter<$PrismaModel> | $Enums.OriginSession
  }

  export type EnumBingoPrizeFilter<$PrismaModel = never> = {
    equals?: $Enums.BingoPrize | EnumBingoPrizeFieldRefInput<$PrismaModel>
    in?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    not?: NestedEnumBingoPrizeFilter<$PrismaModel> | $Enums.BingoPrize
  }

  export type live_sessionsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    link?: SortOrder
    origin?: SortOrder
    prize?: SortOrder
  }

  export type live_sessionsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type live_sessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    link?: SortOrder
    origin?: SortOrder
    prize?: SortOrder
  }

  export type live_sessionsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    link?: SortOrder
    origin?: SortOrder
    prize?: SortOrder
  }

  export type live_sessionsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumOriginSessionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginSession | EnumOriginSessionFieldRefInput<$PrismaModel>
    in?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginSessionWithAggregatesFilter<$PrismaModel> | $Enums.OriginSession
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOriginSessionFilter<$PrismaModel>
    _max?: NestedEnumOriginSessionFilter<$PrismaModel>
  }

  export type EnumBingoPrizeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BingoPrize | EnumBingoPrizeFieldRefInput<$PrismaModel>
    in?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    not?: NestedEnumBingoPrizeWithAggregatesFilter<$PrismaModel> | $Enums.BingoPrize
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBingoPrizeFilter<$PrismaModel>
    _max?: NestedEnumBingoPrizeFilter<$PrismaModel>
  }

  export type source_codesCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    code?: SortOrder
    is_available?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type source_codesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type source_codesMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    code?: SortOrder
    is_available?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type source_codesMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    code?: SortOrder
    is_available?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type source_codesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumstatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumstatusNullableFilter<$PrismaModel> | $Enums.status | null
  }

  export type bingo_prizesCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    prize?: SortOrder
    status?: SortOrder
    prize_image?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
  }

  export type bingo_prizesAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type bingo_prizesMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    prize?: SortOrder
    status?: SortOrder
    prize_image?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
  }

  export type bingo_prizesMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    prize?: SortOrder
    status?: SortOrder
    prize_image?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
  }

  export type bingo_prizesSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type EnumstatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumstatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumstatusNullableFilter<$PrismaModel>
    _max?: NestedEnumstatusNullableFilter<$PrismaModel>
  }

  export type BingoCardboardsCreateNestedManyWithoutUserInput = {
    create?: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput> | BingoCardboardsCreateWithoutUserInput[] | BingoCardboardsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutUserInput | BingoCardboardsCreateOrConnectWithoutUserInput[]
    createMany?: BingoCardboardsCreateManyUserInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type CodesCreateNestedManyWithoutUserInput = {
    create?: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput> | CodesCreateWithoutUserInput[] | CodesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodesCreateOrConnectWithoutUserInput | CodesCreateOrConnectWithoutUserInput[]
    createMany?: CodesCreateManyUserInputEnvelope
    connect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
  }

  export type ParametersCreateNestedManyWithoutLast_modified_byInput = {
    create?: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput> | ParametersCreateWithoutLast_modified_byInput[] | ParametersUncheckedCreateWithoutLast_modified_byInput[]
    connectOrCreate?: ParametersCreateOrConnectWithoutLast_modified_byInput | ParametersCreateOrConnectWithoutLast_modified_byInput[]
    createMany?: ParametersCreateManyLast_modified_byInputEnvelope
    connect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
  }

  export type BingoCardboardsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput> | BingoCardboardsCreateWithoutUserInput[] | BingoCardboardsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutUserInput | BingoCardboardsCreateOrConnectWithoutUserInput[]
    createMany?: BingoCardboardsCreateManyUserInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type CodesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput> | CodesCreateWithoutUserInput[] | CodesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodesCreateOrConnectWithoutUserInput | CodesCreateOrConnectWithoutUserInput[]
    createMany?: CodesCreateManyUserInputEnvelope
    connect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
  }

  export type ParametersUncheckedCreateNestedManyWithoutLast_modified_byInput = {
    create?: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput> | ParametersCreateWithoutLast_modified_byInput[] | ParametersUncheckedCreateWithoutLast_modified_byInput[]
    connectOrCreate?: ParametersCreateOrConnectWithoutLast_modified_byInput | ParametersCreateOrConnectWithoutLast_modified_byInput[]
    createMany?: ParametersCreateManyLast_modified_byInputEnvelope
    connect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BingoCardboardsUpdateManyWithoutUserNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput> | BingoCardboardsCreateWithoutUserInput[] | BingoCardboardsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutUserInput | BingoCardboardsCreateOrConnectWithoutUserInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutUserInput | BingoCardboardsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BingoCardboardsCreateManyUserInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutUserInput | BingoCardboardsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutUserInput | BingoCardboardsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type CodesUpdateManyWithoutUserNestedInput = {
    create?: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput> | CodesCreateWithoutUserInput[] | CodesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodesCreateOrConnectWithoutUserInput | CodesCreateOrConnectWithoutUserInput[]
    upsert?: CodesUpsertWithWhereUniqueWithoutUserInput | CodesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CodesCreateManyUserInputEnvelope
    set?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    disconnect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    delete?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    connect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    update?: CodesUpdateWithWhereUniqueWithoutUserInput | CodesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CodesUpdateManyWithWhereWithoutUserInput | CodesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CodesScalarWhereInput | CodesScalarWhereInput[]
  }

  export type ParametersUpdateManyWithoutLast_modified_byNestedInput = {
    create?: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput> | ParametersCreateWithoutLast_modified_byInput[] | ParametersUncheckedCreateWithoutLast_modified_byInput[]
    connectOrCreate?: ParametersCreateOrConnectWithoutLast_modified_byInput | ParametersCreateOrConnectWithoutLast_modified_byInput[]
    upsert?: ParametersUpsertWithWhereUniqueWithoutLast_modified_byInput | ParametersUpsertWithWhereUniqueWithoutLast_modified_byInput[]
    createMany?: ParametersCreateManyLast_modified_byInputEnvelope
    set?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    disconnect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    delete?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    connect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    update?: ParametersUpdateWithWhereUniqueWithoutLast_modified_byInput | ParametersUpdateWithWhereUniqueWithoutLast_modified_byInput[]
    updateMany?: ParametersUpdateManyWithWhereWithoutLast_modified_byInput | ParametersUpdateManyWithWhereWithoutLast_modified_byInput[]
    deleteMany?: ParametersScalarWhereInput | ParametersScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput> | BingoCardboardsCreateWithoutUserInput[] | BingoCardboardsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutUserInput | BingoCardboardsCreateOrConnectWithoutUserInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutUserInput | BingoCardboardsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BingoCardboardsCreateManyUserInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutUserInput | BingoCardboardsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutUserInput | BingoCardboardsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type CodesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput> | CodesCreateWithoutUserInput[] | CodesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodesCreateOrConnectWithoutUserInput | CodesCreateOrConnectWithoutUserInput[]
    upsert?: CodesUpsertWithWhereUniqueWithoutUserInput | CodesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CodesCreateManyUserInputEnvelope
    set?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    disconnect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    delete?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    connect?: CodesWhereUniqueInput | CodesWhereUniqueInput[]
    update?: CodesUpdateWithWhereUniqueWithoutUserInput | CodesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CodesUpdateManyWithWhereWithoutUserInput | CodesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CodesScalarWhereInput | CodesScalarWhereInput[]
  }

  export type ParametersUncheckedUpdateManyWithoutLast_modified_byNestedInput = {
    create?: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput> | ParametersCreateWithoutLast_modified_byInput[] | ParametersUncheckedCreateWithoutLast_modified_byInput[]
    connectOrCreate?: ParametersCreateOrConnectWithoutLast_modified_byInput | ParametersCreateOrConnectWithoutLast_modified_byInput[]
    upsert?: ParametersUpsertWithWhereUniqueWithoutLast_modified_byInput | ParametersUpsertWithWhereUniqueWithoutLast_modified_byInput[]
    createMany?: ParametersCreateManyLast_modified_byInputEnvelope
    set?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    disconnect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    delete?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    connect?: ParametersWhereUniqueInput | ParametersWhereUniqueInput[]
    update?: ParametersUpdateWithWhereUniqueWithoutLast_modified_byInput | ParametersUpdateWithWhereUniqueWithoutLast_modified_byInput[]
    updateMany?: ParametersUpdateManyWithWhereWithoutLast_modified_byInput | ParametersUpdateManyWithWhereWithoutLast_modified_byInput[]
    deleteMany?: ParametersScalarWhereInput | ParametersScalarWhereInput[]
  }

  export type BingoCardboardsCreateNestedManyWithoutCodesInput = {
    create?: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput> | BingoCardboardsCreateWithoutCodesInput[] | BingoCardboardsUncheckedCreateWithoutCodesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutCodesInput | BingoCardboardsCreateOrConnectWithoutCodesInput[]
    createMany?: BingoCardboardsCreateManyCodesInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCodesInput = {
    create?: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCodesInput
    connect?: UserWhereUniqueInput
  }

  export type BingoCardboardsUncheckedCreateNestedManyWithoutCodesInput = {
    create?: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput> | BingoCardboardsCreateWithoutCodesInput[] | BingoCardboardsUncheckedCreateWithoutCodesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutCodesInput | BingoCardboardsCreateOrConnectWithoutCodesInput[]
    createMany?: BingoCardboardsCreateManyCodesInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type EnumOriginCodesFieldUpdateOperationsInput = {
    set?: $Enums.OriginCodes
  }

  export type EnumUsedCodeForFieldUpdateOperationsInput = {
    set?: $Enums.UsedCodeFor
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BingoCardboardsUpdateManyWithoutCodesNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput> | BingoCardboardsCreateWithoutCodesInput[] | BingoCardboardsUncheckedCreateWithoutCodesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutCodesInput | BingoCardboardsCreateOrConnectWithoutCodesInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutCodesInput | BingoCardboardsUpsertWithWhereUniqueWithoutCodesInput[]
    createMany?: BingoCardboardsCreateManyCodesInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutCodesInput | BingoCardboardsUpdateWithWhereUniqueWithoutCodesInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutCodesInput | BingoCardboardsUpdateManyWithWhereWithoutCodesInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCodesNestedInput = {
    create?: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCodesInput
    upsert?: UserUpsertWithoutCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCodesInput, UserUpdateWithoutCodesInput>, UserUncheckedUpdateWithoutCodesInput>
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutCodesNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput> | BingoCardboardsCreateWithoutCodesInput[] | BingoCardboardsUncheckedCreateWithoutCodesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutCodesInput | BingoCardboardsCreateOrConnectWithoutCodesInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutCodesInput | BingoCardboardsUpsertWithWhereUniqueWithoutCodesInput[]
    createMany?: BingoCardboardsCreateManyCodesInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutCodesInput | BingoCardboardsUpdateWithWhereUniqueWithoutCodesInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutCodesInput | BingoCardboardsUpdateManyWithWhereWithoutCodesInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutParametersInput = {
    create?: XOR<UserCreateWithoutParametersInput, UserUncheckedCreateWithoutParametersInput>
    connectOrCreate?: UserCreateOrConnectWithoutParametersInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutParametersNestedInput = {
    create?: XOR<UserCreateWithoutParametersInput, UserUncheckedCreateWithoutParametersInput>
    connectOrCreate?: UserCreateOrConnectWithoutParametersInput
    upsert?: UserUpsertWithoutParametersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParametersInput, UserUpdateWithoutParametersInput>, UserUncheckedUpdateWithoutParametersInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BingoCardboardsCreateNestedManyWithoutBingoInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput> | BingoCardboardsCreateWithoutBingoInput[] | BingoCardboardsUncheckedCreateWithoutBingoInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingoInput | BingoCardboardsCreateOrConnectWithoutBingoInput[]
    createMany?: BingoCardboardsCreateManyBingoInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type BingoCardboardsUncheckedCreateNestedManyWithoutBingoInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput> | BingoCardboardsCreateWithoutBingoInput[] | BingoCardboardsUncheckedCreateWithoutBingoInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingoInput | BingoCardboardsCreateOrConnectWithoutBingoInput[]
    createMany?: BingoCardboardsCreateManyBingoInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type BingoCardboardsUpdateManyWithoutBingoNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput> | BingoCardboardsCreateWithoutBingoInput[] | BingoCardboardsUncheckedCreateWithoutBingoInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingoInput | BingoCardboardsCreateOrConnectWithoutBingoInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutBingoInput | BingoCardboardsUpsertWithWhereUniqueWithoutBingoInput[]
    createMany?: BingoCardboardsCreateManyBingoInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutBingoInput | BingoCardboardsUpdateWithWhereUniqueWithoutBingoInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutBingoInput | BingoCardboardsUpdateManyWithWhereWithoutBingoInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutBingoNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput> | BingoCardboardsCreateWithoutBingoInput[] | BingoCardboardsUncheckedCreateWithoutBingoInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingoInput | BingoCardboardsCreateOrConnectWithoutBingoInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutBingoInput | BingoCardboardsUpsertWithWhereUniqueWithoutBingoInput[]
    createMany?: BingoCardboardsCreateManyBingoInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutBingoInput | BingoCardboardsUpdateWithWhereUniqueWithoutBingoInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutBingoInput | BingoCardboardsUpdateManyWithWhereWithoutBingoInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type BingoCreateNestedOneWithoutBingoCardboardsInput = {
    create?: XOR<BingoCreateWithoutBingoCardboardsInput, BingoUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: BingoCreateOrConnectWithoutBingoCardboardsInput
    connect?: BingoWhereUniqueInput
  }

  export type CodesCreateNestedOneWithoutBingoCardboardsInput = {
    create?: XOR<CodesCreateWithoutBingoCardboardsInput, CodesUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: CodesCreateOrConnectWithoutBingoCardboardsInput
    connect?: CodesWhereUniqueInput
  }

  export type bingo_prizesCreateNestedOneWithoutBingo_cardboardsInput = {
    create?: XOR<bingo_prizesCreateWithoutBingo_cardboardsInput, bingo_prizesUncheckedCreateWithoutBingo_cardboardsInput>
    connectOrCreate?: bingo_prizesCreateOrConnectWithoutBingo_cardboardsInput
    connect?: bingo_prizesWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBingoCardboardsInput = {
    create?: XOR<UserCreateWithoutBingoCardboardsInput, UserUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBingoCardboardsInput
    connect?: UserWhereUniqueInput
  }

  export type BingoUpdateOneRequiredWithoutBingoCardboardsNestedInput = {
    create?: XOR<BingoCreateWithoutBingoCardboardsInput, BingoUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: BingoCreateOrConnectWithoutBingoCardboardsInput
    upsert?: BingoUpsertWithoutBingoCardboardsInput
    connect?: BingoWhereUniqueInput
    update?: XOR<XOR<BingoUpdateToOneWithWhereWithoutBingoCardboardsInput, BingoUpdateWithoutBingoCardboardsInput>, BingoUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type CodesUpdateOneRequiredWithoutBingoCardboardsNestedInput = {
    create?: XOR<CodesCreateWithoutBingoCardboardsInput, CodesUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: CodesCreateOrConnectWithoutBingoCardboardsInput
    upsert?: CodesUpsertWithoutBingoCardboardsInput
    connect?: CodesWhereUniqueInput
    update?: XOR<XOR<CodesUpdateToOneWithWhereWithoutBingoCardboardsInput, CodesUpdateWithoutBingoCardboardsInput>, CodesUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type bingo_prizesUpdateOneWithoutBingo_cardboardsNestedInput = {
    create?: XOR<bingo_prizesCreateWithoutBingo_cardboardsInput, bingo_prizesUncheckedCreateWithoutBingo_cardboardsInput>
    connectOrCreate?: bingo_prizesCreateOrConnectWithoutBingo_cardboardsInput
    upsert?: bingo_prizesUpsertWithoutBingo_cardboardsInput
    disconnect?: bingo_prizesWhereInput | boolean
    delete?: bingo_prizesWhereInput | boolean
    connect?: bingo_prizesWhereUniqueInput
    update?: XOR<XOR<bingo_prizesUpdateToOneWithWhereWithoutBingo_cardboardsInput, bingo_prizesUpdateWithoutBingo_cardboardsInput>, bingo_prizesUncheckedUpdateWithoutBingo_cardboardsInput>
  }

  export type UserUpdateOneRequiredWithoutBingoCardboardsNestedInput = {
    create?: XOR<UserCreateWithoutBingoCardboardsInput, UserUncheckedCreateWithoutBingoCardboardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBingoCardboardsInput
    upsert?: UserUpsertWithoutBingoCardboardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBingoCardboardsInput, UserUpdateWithoutBingoCardboardsInput>, UserUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type EnumOriginSessionFieldUpdateOperationsInput = {
    set?: $Enums.OriginSession
  }

  export type EnumBingoPrizeFieldUpdateOperationsInput = {
    set?: $Enums.BingoPrize
  }

  export type BingoCardboardsCreateNestedManyWithoutBingo_prizesInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput> | BingoCardboardsCreateWithoutBingo_prizesInput[] | BingoCardboardsUncheckedCreateWithoutBingo_prizesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingo_prizesInput | BingoCardboardsCreateOrConnectWithoutBingo_prizesInput[]
    createMany?: BingoCardboardsCreateManyBingo_prizesInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type BingoCardboardsUncheckedCreateNestedManyWithoutBingo_prizesInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput> | BingoCardboardsCreateWithoutBingo_prizesInput[] | BingoCardboardsUncheckedCreateWithoutBingo_prizesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingo_prizesInput | BingoCardboardsCreateOrConnectWithoutBingo_prizesInput[]
    createMany?: BingoCardboardsCreateManyBingo_prizesInputEnvelope
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
  }

  export type NullableEnumstatusFieldUpdateOperationsInput = {
    set?: $Enums.status | null
  }

  export type BingoCardboardsUpdateManyWithoutBingo_prizesNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput> | BingoCardboardsCreateWithoutBingo_prizesInput[] | BingoCardboardsUncheckedCreateWithoutBingo_prizesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingo_prizesInput | BingoCardboardsCreateOrConnectWithoutBingo_prizesInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutBingo_prizesInput | BingoCardboardsUpsertWithWhereUniqueWithoutBingo_prizesInput[]
    createMany?: BingoCardboardsCreateManyBingo_prizesInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutBingo_prizesInput | BingoCardboardsUpdateWithWhereUniqueWithoutBingo_prizesInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutBingo_prizesInput | BingoCardboardsUpdateManyWithWhereWithoutBingo_prizesInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutBingo_prizesNestedInput = {
    create?: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput> | BingoCardboardsCreateWithoutBingo_prizesInput[] | BingoCardboardsUncheckedCreateWithoutBingo_prizesInput[]
    connectOrCreate?: BingoCardboardsCreateOrConnectWithoutBingo_prizesInput | BingoCardboardsCreateOrConnectWithoutBingo_prizesInput[]
    upsert?: BingoCardboardsUpsertWithWhereUniqueWithoutBingo_prizesInput | BingoCardboardsUpsertWithWhereUniqueWithoutBingo_prizesInput[]
    createMany?: BingoCardboardsCreateManyBingo_prizesInputEnvelope
    set?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    disconnect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    delete?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    connect?: BingoCardboardsWhereUniqueInput | BingoCardboardsWhereUniqueInput[]
    update?: BingoCardboardsUpdateWithWhereUniqueWithoutBingo_prizesInput | BingoCardboardsUpdateWithWhereUniqueWithoutBingo_prizesInput[]
    updateMany?: BingoCardboardsUpdateManyWithWhereWithoutBingo_prizesInput | BingoCardboardsUpdateManyWithWhereWithoutBingo_prizesInput[]
    deleteMany?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumOriginCodesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginCodes | EnumOriginCodesFieldRefInput<$PrismaModel>
    in?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginCodesFilter<$PrismaModel> | $Enums.OriginCodes
  }

  export type NestedEnumUsedCodeForFilter<$PrismaModel = never> = {
    equals?: $Enums.UsedCodeFor | EnumUsedCodeForFieldRefInput<$PrismaModel>
    in?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    not?: NestedEnumUsedCodeForFilter<$PrismaModel> | $Enums.UsedCodeFor
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumOriginCodesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginCodes | EnumOriginCodesFieldRefInput<$PrismaModel>
    in?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginCodes[] | ListEnumOriginCodesFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginCodesWithAggregatesFilter<$PrismaModel> | $Enums.OriginCodes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOriginCodesFilter<$PrismaModel>
    _max?: NestedEnumOriginCodesFilter<$PrismaModel>
  }

  export type NestedEnumUsedCodeForWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsedCodeFor | EnumUsedCodeForFieldRefInput<$PrismaModel>
    in?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsedCodeFor[] | ListEnumUsedCodeForFieldRefInput<$PrismaModel>
    not?: NestedEnumUsedCodeForWithAggregatesFilter<$PrismaModel> | $Enums.UsedCodeFor
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsedCodeForFilter<$PrismaModel>
    _max?: NestedEnumUsedCodeForFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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

  export type NestedEnumOriginSessionFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginSession | EnumOriginSessionFieldRefInput<$PrismaModel>
    in?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginSessionFilter<$PrismaModel> | $Enums.OriginSession
  }

  export type NestedEnumBingoPrizeFilter<$PrismaModel = never> = {
    equals?: $Enums.BingoPrize | EnumBingoPrizeFieldRefInput<$PrismaModel>
    in?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    not?: NestedEnumBingoPrizeFilter<$PrismaModel> | $Enums.BingoPrize
  }

  export type NestedEnumOriginSessionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OriginSession | EnumOriginSessionFieldRefInput<$PrismaModel>
    in?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OriginSession[] | ListEnumOriginSessionFieldRefInput<$PrismaModel>
    not?: NestedEnumOriginSessionWithAggregatesFilter<$PrismaModel> | $Enums.OriginSession
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOriginSessionFilter<$PrismaModel>
    _max?: NestedEnumOriginSessionFilter<$PrismaModel>
  }

  export type NestedEnumBingoPrizeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BingoPrize | EnumBingoPrizeFieldRefInput<$PrismaModel>
    in?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BingoPrize[] | ListEnumBingoPrizeFieldRefInput<$PrismaModel>
    not?: NestedEnumBingoPrizeWithAggregatesFilter<$PrismaModel> | $Enums.BingoPrize
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBingoPrizeFilter<$PrismaModel>
    _max?: NestedEnumBingoPrizeFilter<$PrismaModel>
  }

  export type NestedEnumstatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumstatusNullableFilter<$PrismaModel> | $Enums.status | null
  }

  export type NestedEnumstatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.status | EnumstatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.status[] | ListEnumstatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumstatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumstatusNullableFilter<$PrismaModel>
    _max?: NestedEnumstatusNullableFilter<$PrismaModel>
  }

  export type BingoCardboardsCreateWithoutUserInput = {
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo: BingoCreateNestedOneWithoutBingoCardboardsInput
    Codes: CodesCreateNestedOneWithoutBingoCardboardsInput
    bingo_prizes?: bingo_prizesCreateNestedOneWithoutBingo_cardboardsInput
  }

  export type BingoCardboardsUncheckedCreateWithoutUserInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsCreateOrConnectWithoutUserInput = {
    where: BingoCardboardsWhereUniqueInput
    create: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput>
  }

  export type BingoCardboardsCreateManyUserInputEnvelope = {
    data: BingoCardboardsCreateManyUserInput | BingoCardboardsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CodesCreateWithoutUserInput = {
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutCodesInput
  }

  export type CodesUncheckedCreateWithoutUserInput = {
    id?: number
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutCodesInput
  }

  export type CodesCreateOrConnectWithoutUserInput = {
    where: CodesWhereUniqueInput
    create: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput>
  }

  export type CodesCreateManyUserInputEnvelope = {
    data: CodesCreateManyUserInput | CodesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ParametersCreateWithoutLast_modified_byInput = {
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUncheckedCreateWithoutLast_modified_byInput = {
    id?: number
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersCreateOrConnectWithoutLast_modified_byInput = {
    where: ParametersWhereUniqueInput
    create: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput>
  }

  export type ParametersCreateManyLast_modified_byInputEnvelope = {
    data: ParametersCreateManyLast_modified_byInput | ParametersCreateManyLast_modified_byInput[]
    skipDuplicates?: boolean
  }

  export type BingoCardboardsUpsertWithWhereUniqueWithoutUserInput = {
    where: BingoCardboardsWhereUniqueInput
    update: XOR<BingoCardboardsUpdateWithoutUserInput, BingoCardboardsUncheckedUpdateWithoutUserInput>
    create: XOR<BingoCardboardsCreateWithoutUserInput, BingoCardboardsUncheckedCreateWithoutUserInput>
  }

  export type BingoCardboardsUpdateWithWhereUniqueWithoutUserInput = {
    where: BingoCardboardsWhereUniqueInput
    data: XOR<BingoCardboardsUpdateWithoutUserInput, BingoCardboardsUncheckedUpdateWithoutUserInput>
  }

  export type BingoCardboardsUpdateManyWithWhereWithoutUserInput = {
    where: BingoCardboardsScalarWhereInput
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyWithoutUserInput>
  }

  export type BingoCardboardsScalarWhereInput = {
    AND?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
    OR?: BingoCardboardsScalarWhereInput[]
    NOT?: BingoCardboardsScalarWhereInput | BingoCardboardsScalarWhereInput[]
    id?: IntFilter<"BingoCardboards"> | number
    code_id?: IntFilter<"BingoCardboards"> | number
    bingo_id?: IntFilter<"BingoCardboards"> | number
    is_winner?: BoolFilter<"BingoCardboards"> | boolean
    user_id?: IntFilter<"BingoCardboards"> | number
    bingo_data_json?: JsonFilter<"BingoCardboards">
    created_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    updated_at?: DateTimeFilter<"BingoCardboards"> | Date | string
    deleted_at?: DateTimeNullableFilter<"BingoCardboards"> | Date | string | null
    prize_id?: IntNullableFilter<"BingoCardboards"> | number | null
  }

  export type CodesUpsertWithWhereUniqueWithoutUserInput = {
    where: CodesWhereUniqueInput
    update: XOR<CodesUpdateWithoutUserInput, CodesUncheckedUpdateWithoutUserInput>
    create: XOR<CodesCreateWithoutUserInput, CodesUncheckedCreateWithoutUserInput>
  }

  export type CodesUpdateWithWhereUniqueWithoutUserInput = {
    where: CodesWhereUniqueInput
    data: XOR<CodesUpdateWithoutUserInput, CodesUncheckedUpdateWithoutUserInput>
  }

  export type CodesUpdateManyWithWhereWithoutUserInput = {
    where: CodesScalarWhereInput
    data: XOR<CodesUpdateManyMutationInput, CodesUncheckedUpdateManyWithoutUserInput>
  }

  export type CodesScalarWhereInput = {
    AND?: CodesScalarWhereInput | CodesScalarWhereInput[]
    OR?: CodesScalarWhereInput[]
    NOT?: CodesScalarWhereInput | CodesScalarWhereInput[]
    id?: IntFilter<"Codes"> | number
    code?: StringFilter<"Codes"> | string
    origin?: EnumOriginCodesFilter<"Codes"> | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFilter<"Codes"> | $Enums.UsedCodeFor
    user_id?: IntFilter<"Codes"> | number
    is_used?: BoolFilter<"Codes"> | boolean
    cost?: FloatNullableFilter<"Codes"> | number | null
    created_at?: DateTimeFilter<"Codes"> | Date | string
    updated_at?: DateTimeFilter<"Codes"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Codes"> | Date | string | null
    used_date?: DateTimeNullableFilter<"Codes"> | Date | string | null
  }

  export type ParametersUpsertWithWhereUniqueWithoutLast_modified_byInput = {
    where: ParametersWhereUniqueInput
    update: XOR<ParametersUpdateWithoutLast_modified_byInput, ParametersUncheckedUpdateWithoutLast_modified_byInput>
    create: XOR<ParametersCreateWithoutLast_modified_byInput, ParametersUncheckedCreateWithoutLast_modified_byInput>
  }

  export type ParametersUpdateWithWhereUniqueWithoutLast_modified_byInput = {
    where: ParametersWhereUniqueInput
    data: XOR<ParametersUpdateWithoutLast_modified_byInput, ParametersUncheckedUpdateWithoutLast_modified_byInput>
  }

  export type ParametersUpdateManyWithWhereWithoutLast_modified_byInput = {
    where: ParametersScalarWhereInput
    data: XOR<ParametersUpdateManyMutationInput, ParametersUncheckedUpdateManyWithoutLast_modified_byInput>
  }

  export type ParametersScalarWhereInput = {
    AND?: ParametersScalarWhereInput | ParametersScalarWhereInput[]
    OR?: ParametersScalarWhereInput[]
    NOT?: ParametersScalarWhereInput | ParametersScalarWhereInput[]
    id?: IntFilter<"Parameters"> | number
    cost_per_code?: FloatFilter<"Parameters"> | number
    min_participants_for_bingo?: IntFilter<"Parameters"> | number
    cardboard_per_code?: IntFilter<"Parameters"> | number
    created_at?: DateTimeFilter<"Parameters"> | Date | string
    updated_at?: DateTimeFilter<"Parameters"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Parameters"> | Date | string | null
    last_modified_by_id?: IntNullableFilter<"Parameters"> | number | null
    bingo_prizes?: JsonNullableFilter<"Parameters">
  }

  export type BingoCardboardsCreateWithoutCodesInput = {
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo: BingoCreateNestedOneWithoutBingoCardboardsInput
    bingo_prizes?: bingo_prizesCreateNestedOneWithoutBingo_cardboardsInput
    user: UserCreateNestedOneWithoutBingoCardboardsInput
  }

  export type BingoCardboardsUncheckedCreateWithoutCodesInput = {
    id?: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsCreateOrConnectWithoutCodesInput = {
    where: BingoCardboardsWhereUniqueInput
    create: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput>
  }

  export type BingoCardboardsCreateManyCodesInputEnvelope = {
    data: BingoCardboardsCreateManyCodesInput | BingoCardboardsCreateManyCodesInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCodesInput = {
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutUserInput
    Parameters?: ParametersCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserUncheckedCreateWithoutCodesInput = {
    id?: number
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutUserInput
    Parameters?: ParametersUncheckedCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserCreateOrConnectWithoutCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
  }

  export type BingoCardboardsUpsertWithWhereUniqueWithoutCodesInput = {
    where: BingoCardboardsWhereUniqueInput
    update: XOR<BingoCardboardsUpdateWithoutCodesInput, BingoCardboardsUncheckedUpdateWithoutCodesInput>
    create: XOR<BingoCardboardsCreateWithoutCodesInput, BingoCardboardsUncheckedCreateWithoutCodesInput>
  }

  export type BingoCardboardsUpdateWithWhereUniqueWithoutCodesInput = {
    where: BingoCardboardsWhereUniqueInput
    data: XOR<BingoCardboardsUpdateWithoutCodesInput, BingoCardboardsUncheckedUpdateWithoutCodesInput>
  }

  export type BingoCardboardsUpdateManyWithWhereWithoutCodesInput = {
    where: BingoCardboardsScalarWhereInput
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyWithoutCodesInput>
  }

  export type UserUpsertWithoutCodesInput = {
    update: XOR<UserUpdateWithoutCodesInput, UserUncheckedUpdateWithoutCodesInput>
    create: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCodesInput, UserUncheckedUpdateWithoutCodesInput>
  }

  export type UserUpdateWithoutCodesInput = {
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUpdateManyWithoutLast_modified_byNestedInput
  }

  export type UserUncheckedUpdateWithoutCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUncheckedUpdateManyWithoutLast_modified_byNestedInput
  }

  export type UserCreateWithoutParametersInput = {
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsCreateNestedManyWithoutUserInput
    Codes?: CodesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutParametersInput = {
    id?: number
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    BingoCardboards?: BingoCardboardsUncheckedCreateNestedManyWithoutUserInput
    Codes?: CodesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutParametersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParametersInput, UserUncheckedCreateWithoutParametersInput>
  }

  export type UserUpsertWithoutParametersInput = {
    update: XOR<UserUpdateWithoutParametersInput, UserUncheckedUpdateWithoutParametersInput>
    create: XOR<UserCreateWithoutParametersInput, UserUncheckedCreateWithoutParametersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParametersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParametersInput, UserUncheckedUpdateWithoutParametersInput>
  }

  export type UserUpdateWithoutParametersInput = {
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutUserNestedInput
    Codes?: CodesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutParametersInput = {
    id?: IntFieldUpdateOperationsInput | number
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutUserNestedInput
    Codes?: CodesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BingoCardboardsCreateWithoutBingoInput = {
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    Codes: CodesCreateNestedOneWithoutBingoCardboardsInput
    bingo_prizes?: bingo_prizesCreateNestedOneWithoutBingo_cardboardsInput
    user: UserCreateNestedOneWithoutBingoCardboardsInput
  }

  export type BingoCardboardsUncheckedCreateWithoutBingoInput = {
    id?: number
    code_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsCreateOrConnectWithoutBingoInput = {
    where: BingoCardboardsWhereUniqueInput
    create: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput>
  }

  export type BingoCardboardsCreateManyBingoInputEnvelope = {
    data: BingoCardboardsCreateManyBingoInput | BingoCardboardsCreateManyBingoInput[]
    skipDuplicates?: boolean
  }

  export type BingoCardboardsUpsertWithWhereUniqueWithoutBingoInput = {
    where: BingoCardboardsWhereUniqueInput
    update: XOR<BingoCardboardsUpdateWithoutBingoInput, BingoCardboardsUncheckedUpdateWithoutBingoInput>
    create: XOR<BingoCardboardsCreateWithoutBingoInput, BingoCardboardsUncheckedCreateWithoutBingoInput>
  }

  export type BingoCardboardsUpdateWithWhereUniqueWithoutBingoInput = {
    where: BingoCardboardsWhereUniqueInput
    data: XOR<BingoCardboardsUpdateWithoutBingoInput, BingoCardboardsUncheckedUpdateWithoutBingoInput>
  }

  export type BingoCardboardsUpdateManyWithWhereWithoutBingoInput = {
    where: BingoCardboardsScalarWhereInput
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyWithoutBingoInput>
  }

  export type BingoCreateWithoutBingoCardboardsInput = {
    number_of_participants?: number
    cardboard_by_code: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    is_started?: boolean
    min_number_of_participants?: number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: boolean | null
  }

  export type BingoUncheckedCreateWithoutBingoCardboardsInput = {
    id?: number
    number_of_participants?: number
    cardboard_by_code: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    is_started?: boolean
    min_number_of_participants?: number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: boolean | null
  }

  export type BingoCreateOrConnectWithoutBingoCardboardsInput = {
    where: BingoWhereUniqueInput
    create: XOR<BingoCreateWithoutBingoCardboardsInput, BingoUncheckedCreateWithoutBingoCardboardsInput>
  }

  export type CodesCreateWithoutBingoCardboardsInput = {
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
    User: UserCreateNestedOneWithoutCodesInput
  }

  export type CodesUncheckedCreateWithoutBingoCardboardsInput = {
    id?: number
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    user_id: number
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
  }

  export type CodesCreateOrConnectWithoutBingoCardboardsInput = {
    where: CodesWhereUniqueInput
    create: XOR<CodesCreateWithoutBingoCardboardsInput, CodesUncheckedCreateWithoutBingoCardboardsInput>
  }

  export type bingo_prizesCreateWithoutBingo_cardboardsInput = {
    created_at?: Date | string
    prize?: string | null
    status?: $Enums.status | null
    prize_image?: string | null
    quantity?: number | null
    description?: string | null
  }

  export type bingo_prizesUncheckedCreateWithoutBingo_cardboardsInput = {
    id?: number
    created_at?: Date | string
    prize?: string | null
    status?: $Enums.status | null
    prize_image?: string | null
    quantity?: number | null
    description?: string | null
  }

  export type bingo_prizesCreateOrConnectWithoutBingo_cardboardsInput = {
    where: bingo_prizesWhereUniqueInput
    create: XOR<bingo_prizesCreateWithoutBingo_cardboardsInput, bingo_prizesUncheckedCreateWithoutBingo_cardboardsInput>
  }

  export type UserCreateWithoutBingoCardboardsInput = {
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    Codes?: CodesCreateNestedManyWithoutUserInput
    Parameters?: ParametersCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserUncheckedCreateWithoutBingoCardboardsInput = {
    id?: number
    names: string
    last_names: string
    email: string
    password: string
    role?: $Enums.Role
    phone_number?: string | null
    account_owner_name?: string | null
    account_owner_dni?: string | null
    account_number?: string | null
    bank_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    code_verification?: string | null
    change_password?: boolean | null
    is_verified?: boolean | null
    dni?: string | null
    Codes?: CodesUncheckedCreateNestedManyWithoutUserInput
    Parameters?: ParametersUncheckedCreateNestedManyWithoutLast_modified_byInput
  }

  export type UserCreateOrConnectWithoutBingoCardboardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBingoCardboardsInput, UserUncheckedCreateWithoutBingoCardboardsInput>
  }

  export type BingoUpsertWithoutBingoCardboardsInput = {
    update: XOR<BingoUpdateWithoutBingoCardboardsInput, BingoUncheckedUpdateWithoutBingoCardboardsInput>
    create: XOR<BingoCreateWithoutBingoCardboardsInput, BingoUncheckedCreateWithoutBingoCardboardsInput>
    where?: BingoWhereInput
  }

  export type BingoUpdateToOneWithWhereWithoutBingoCardboardsInput = {
    where?: BingoWhereInput
    data: XOR<BingoUpdateWithoutBingoCardboardsInput, BingoUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type BingoUpdateWithoutBingoCardboardsInput = {
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type BingoUncheckedUpdateWithoutBingoCardboardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    number_of_participants?: IntFieldUpdateOperationsInput | number
    cardboard_by_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_started?: BoolFieldUpdateOperationsInput | boolean
    min_number_of_participants?: NullableIntFieldUpdateOperationsInput | number | null
    winners?: NullableJsonNullValueInput | InputJsonValue
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
    numbers_played?: NullableJsonNullValueInput | InputJsonValue
    is_finished?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type CodesUpsertWithoutBingoCardboardsInput = {
    update: XOR<CodesUpdateWithoutBingoCardboardsInput, CodesUncheckedUpdateWithoutBingoCardboardsInput>
    create: XOR<CodesCreateWithoutBingoCardboardsInput, CodesUncheckedCreateWithoutBingoCardboardsInput>
    where?: CodesWhereInput
  }

  export type CodesUpdateToOneWithWhereWithoutBingoCardboardsInput = {
    where?: CodesWhereInput
    data: XOR<CodesUpdateWithoutBingoCardboardsInput, CodesUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type CodesUpdateWithoutBingoCardboardsInput = {
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUpdateOneRequiredWithoutCodesNestedInput
  }

  export type CodesUncheckedUpdateWithoutBingoCardboardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    user_id?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bingo_prizesUpsertWithoutBingo_cardboardsInput = {
    update: XOR<bingo_prizesUpdateWithoutBingo_cardboardsInput, bingo_prizesUncheckedUpdateWithoutBingo_cardboardsInput>
    create: XOR<bingo_prizesCreateWithoutBingo_cardboardsInput, bingo_prizesUncheckedCreateWithoutBingo_cardboardsInput>
    where?: bingo_prizesWhereInput
  }

  export type bingo_prizesUpdateToOneWithWhereWithoutBingo_cardboardsInput = {
    where?: bingo_prizesWhereInput
    data: XOR<bingo_prizesUpdateWithoutBingo_cardboardsInput, bingo_prizesUncheckedUpdateWithoutBingo_cardboardsInput>
  }

  export type bingo_prizesUpdateWithoutBingo_cardboardsInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bingo_prizesUncheckedUpdateWithoutBingo_cardboardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prize?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumstatusFieldUpdateOperationsInput | $Enums.status | null
    prize_image?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutBingoCardboardsInput = {
    update: XOR<UserUpdateWithoutBingoCardboardsInput, UserUncheckedUpdateWithoutBingoCardboardsInput>
    create: XOR<UserCreateWithoutBingoCardboardsInput, UserUncheckedCreateWithoutBingoCardboardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBingoCardboardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBingoCardboardsInput, UserUncheckedUpdateWithoutBingoCardboardsInput>
  }

  export type UserUpdateWithoutBingoCardboardsInput = {
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    Codes?: CodesUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUpdateManyWithoutLast_modified_byNestedInput
  }

  export type UserUncheckedUpdateWithoutBingoCardboardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    names?: StringFieldUpdateOperationsInput | string
    last_names?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_name?: NullableStringFieldUpdateOperationsInput | string | null
    account_owner_dni?: NullableStringFieldUpdateOperationsInput | string | null
    account_number?: NullableStringFieldUpdateOperationsInput | string | null
    bank_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    code_verification?: NullableStringFieldUpdateOperationsInput | string | null
    change_password?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    dni?: NullableStringFieldUpdateOperationsInput | string | null
    Codes?: CodesUncheckedUpdateManyWithoutUserNestedInput
    Parameters?: ParametersUncheckedUpdateManyWithoutLast_modified_byNestedInput
  }

  export type BingoCardboardsCreateWithoutBingo_prizesInput = {
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo: BingoCreateNestedOneWithoutBingoCardboardsInput
    Codes: CodesCreateNestedOneWithoutBingoCardboardsInput
    user: UserCreateNestedOneWithoutBingoCardboardsInput
  }

  export type BingoCardboardsUncheckedCreateWithoutBingo_prizesInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type BingoCardboardsCreateOrConnectWithoutBingo_prizesInput = {
    where: BingoCardboardsWhereUniqueInput
    create: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput>
  }

  export type BingoCardboardsCreateManyBingo_prizesInputEnvelope = {
    data: BingoCardboardsCreateManyBingo_prizesInput | BingoCardboardsCreateManyBingo_prizesInput[]
    skipDuplicates?: boolean
  }

  export type BingoCardboardsUpsertWithWhereUniqueWithoutBingo_prizesInput = {
    where: BingoCardboardsWhereUniqueInput
    update: XOR<BingoCardboardsUpdateWithoutBingo_prizesInput, BingoCardboardsUncheckedUpdateWithoutBingo_prizesInput>
    create: XOR<BingoCardboardsCreateWithoutBingo_prizesInput, BingoCardboardsUncheckedCreateWithoutBingo_prizesInput>
  }

  export type BingoCardboardsUpdateWithWhereUniqueWithoutBingo_prizesInput = {
    where: BingoCardboardsWhereUniqueInput
    data: XOR<BingoCardboardsUpdateWithoutBingo_prizesInput, BingoCardboardsUncheckedUpdateWithoutBingo_prizesInput>
  }

  export type BingoCardboardsUpdateManyWithWhereWithoutBingo_prizesInput = {
    where: BingoCardboardsScalarWhereInput
    data: XOR<BingoCardboardsUpdateManyMutationInput, BingoCardboardsUncheckedUpdateManyWithoutBingo_prizesInput>
  }

  export type BingoCardboardsCreateManyUserInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type CodesCreateManyUserInput = {
    id?: number
    code: string
    origin?: $Enums.OriginCodes
    used_for?: $Enums.UsedCodeFor
    is_used?: boolean
    cost?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    used_date?: Date | string | null
  }

  export type ParametersCreateManyLast_modified_byInput = {
    id?: number
    cost_per_code?: number
    min_participants_for_bingo?: number
    cardboard_per_code?: number
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type BingoCardboardsUpdateWithoutUserInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo?: BingoUpdateOneRequiredWithoutBingoCardboardsNestedInput
    Codes?: CodesUpdateOneRequiredWithoutBingoCardboardsNestedInput
    bingo_prizes?: bingo_prizesUpdateOneWithoutBingo_cardboardsNestedInput
  }

  export type BingoCardboardsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CodesUpdateWithoutUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    BingoCardboards?: BingoCardboardsUpdateManyWithoutCodesNestedInput
  }

  export type CodesUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    BingoCardboards?: BingoCardboardsUncheckedUpdateManyWithoutCodesNestedInput
  }

  export type CodesUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    origin?: EnumOriginCodesFieldUpdateOperationsInput | $Enums.OriginCodes
    used_for?: EnumUsedCodeForFieldUpdateOperationsInput | $Enums.UsedCodeFor
    is_used?: BoolFieldUpdateOperationsInput | boolean
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParametersUpdateWithoutLast_modified_byInput = {
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUncheckedUpdateWithoutLast_modified_byInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ParametersUncheckedUpdateManyWithoutLast_modified_byInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_per_code?: FloatFieldUpdateOperationsInput | number
    min_participants_for_bingo?: IntFieldUpdateOperationsInput | number
    cardboard_per_code?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo_prizes?: NullableJsonNullValueInput | InputJsonValue
  }

  export type BingoCardboardsCreateManyCodesInput = {
    id?: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsUpdateWithoutCodesInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo?: BingoUpdateOneRequiredWithoutBingoCardboardsNestedInput
    bingo_prizes?: bingo_prizesUpdateOneWithoutBingo_cardboardsNestedInput
    user?: UserUpdateOneRequiredWithoutBingoCardboardsNestedInput
  }

  export type BingoCardboardsUncheckedUpdateWithoutCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsCreateManyBingoInput = {
    id?: number
    code_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    prize_id?: number | null
  }

  export type BingoCardboardsUpdateWithoutBingoInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Codes?: CodesUpdateOneRequiredWithoutBingoCardboardsNestedInput
    bingo_prizes?: bingo_prizesUpdateOneWithoutBingo_cardboardsNestedInput
    user?: UserUpdateOneRequiredWithoutBingoCardboardsNestedInput
  }

  export type BingoCardboardsUncheckedUpdateWithoutBingoInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutBingoInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prize_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BingoCardboardsCreateManyBingo_prizesInput = {
    id?: number
    code_id: number
    bingo_id: number
    is_winner?: boolean
    user_id: number
    bingo_data_json: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type BingoCardboardsUpdateWithoutBingo_prizesInput = {
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingo?: BingoUpdateOneRequiredWithoutBingoCardboardsNestedInput
    Codes?: CodesUpdateOneRequiredWithoutBingoCardboardsNestedInput
    user?: UserUpdateOneRequiredWithoutBingoCardboardsNestedInput
  }

  export type BingoCardboardsUncheckedUpdateWithoutBingo_prizesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BingoCardboardsUncheckedUpdateManyWithoutBingo_prizesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code_id?: IntFieldUpdateOperationsInput | number
    bingo_id?: IntFieldUpdateOperationsInput | number
    is_winner?: BoolFieldUpdateOperationsInput | boolean
    user_id?: IntFieldUpdateOperationsInput | number
    bingo_data_json?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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