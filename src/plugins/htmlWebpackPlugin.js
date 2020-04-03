
  class htmlWebpackPlugin{
      constructor(options){
          this.options = options;
      }
      apply(compiler){
        compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', compilation => {
            const SyncWaterfallHook = require('tapable').SyncWaterfallHook;
            const AsyncSeriesWaterfallHook = require('tapable').AsyncSeriesWaterfallHook;
            compilation.hooks.htmlWebpackPluginAlterChunks = new SyncWaterfallHook(['chunks', 'objectWithPluginRef']);
            compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration = new AsyncSeriesWaterfallHook(['pluginArgs']);
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing = new AsyncSeriesWaterfallHook(['pluginArgs']);
            compilation.hooks.htmlWebpackPluginAlterAssetTags = new AsyncSeriesWaterfallHook(['pluginArgs']);
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing = new AsyncSeriesWaterfallHook(['pluginArgs']);
            compilation.hooks.htmlWebpackPluginAfterEmit = new AsyncSeriesWaterfallHook(['pluginArgs']);
          });
      }
  }