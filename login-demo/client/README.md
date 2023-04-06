# mfa-react


Change configuration in `src/App.tsx`:

``` typescript
<AuthingMFAProvider
  appId="AUTHING_APP_ID"
>
  <RouterComponent></RouterComponent>
</AuthingMFAProvider>
```

Run:

``` shell
npm ci
npm run dev
```
