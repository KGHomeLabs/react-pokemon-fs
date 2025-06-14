echo "Current branch: $CF_PAGES_BRANCH"

case "$CF_PAGES_BRANCH" in
  master)
    export VITE_APP_ENV=production
    echo "Set VITE_APP_ENV to production"
    ;;
  prev)
    export VITE_APP_ENV=preview
    echo "Set VITE_APP_ENV to preview"
    ;;
  dev)
    export VITE_APP_ENV=development
    echo "Set VITE_APP_ENV to development"
    ;;
  *)
    export VITE_APP_ENV=development
    echo "Unknown branch, defaulting VITE_APP_ENV to development"
    ;;
esac

yarn build