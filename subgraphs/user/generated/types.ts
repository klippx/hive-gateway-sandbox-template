import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  _FieldSet: { input: any; output: any };
};

export type $Organization = {
  __typename?: "Organization";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type $User = {
  __typename?: "User";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  organization: $Organization;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
type NullableCheck<T, S> =
  Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
type ListCheck<T, S> = T extends (infer U)[]
  ? NullableCheck<U, S>[]
  : GraphQLRecursivePick<T, S>;
export type GraphQLRecursivePick<T, S> = {
  [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]>;
};

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of federation types */
export type $FederationTypes = ResolversObject<{
  Organization: $Organization;
  User: $User;
}>;

/** Mapping of federation reference types */
export type $FederationReferenceTypes = ResolversObject<{
  Organization: { __typename: "Organization" } & GraphQLRecursivePick<
    FederationTypes["Organization"],
    { id: true }
  >;
  User: { __typename: "User" } & GraphQLRecursivePick<
    FederationTypes["User"],
    { id: true; organization: { id: true } }
  >;
}>;

/** Mapping between all available schema types and the resolvers types */
export type $ResolversTypes = ResolversObject<{
  Organization: ResolverTypeWrapper<$Organization>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  User: ResolverTypeWrapper<$User>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type $ResolversParentTypes = ResolversObject<{
  Organization: $Organization | $FederationReferenceTypes["Organization"];
  ID: Scalars["ID"]["output"];
  String: Scalars["String"]["output"];
  User: $User | $FederationReferenceTypes["User"];
  Boolean: Scalars["Boolean"]["output"];
}>;

export type $OrganizationResolvers<
  ContextType = any,
  ParentType extends
    $ResolversParentTypes["Organization"] = $ResolversParentTypes["Organization"],
  FederationReferenceType extends
    $FederationReferenceTypes["Organization"] = $FederationReferenceTypes["Organization"],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<$ResolversTypes["Organization"]> | FederationReferenceType,
    FederationReferenceType,
    ContextType
  >;
  id?: Resolver<$ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<$ResolversTypes["String"], ParentType, ContextType>;
}>;

export type $UserResolvers<
  ContextType = any,
  ParentType extends
    $ResolversParentTypes["User"] = $ResolversParentTypes["User"],
  FederationReferenceType extends
    $FederationReferenceTypes["User"] = $FederationReferenceTypes["User"],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<$ResolversTypes["User"]> | FederationReferenceType,
    FederationReferenceType,
    ContextType
  >;
  id?: Resolver<$ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<$ResolversTypes["String"], ParentType, ContextType>;
  organization?: Resolver<
    $ResolversTypes["Organization"],
    ParentType,
    ContextType
  >;
}>;

export type $Resolvers<ContextType = any> = ResolversObject<{
  Organization?: $OrganizationResolvers<ContextType>;
  User?: $UserResolvers<ContextType>;
}>;
