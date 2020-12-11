// @ts-check

window.Promise = window.TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize(
  {
    'board-views': (t) => [
      {
        name: 'Insights',
        icon: 'https://trello-insights.netlify.app/insights.png',
        key: 'insights',
        description: 'View insights of your Board.',
        url: t.signUrl('./board-summary.html', {
          idBoard: t.getContext().board,
        }),
      },
    ],
    'list-actions': (t) =>
      t.list('name').then((list) => [
        {
          text: 'Insights',
          callback: (context) =>
            context.get('member', 'private', 'token').then((token) => {
              if (!token) {
                return context.popup({
                  args: {
                    idBoard: context.getContext().board,
                    idList: context.getContext().list,
                    list: list.name,
                  },
                  title: 'Authorize Your Account',
                  url: './auth.html',
                  height: 75,
                });
              }

              return context.modal({
                args: {
                  idBoard: context.getContext().board,
                  idList: context.getContext().list,
                },
                url: './list-summary.html',
                accentColor: '#6C547B',
                fullscreen: true,
                title: `Insights for: ${list.name}`,
              });
            }),
        },
      ]),
  },
  {
    targetOrigin: 'http://loopback.planatee.com:3000',
  }
);
