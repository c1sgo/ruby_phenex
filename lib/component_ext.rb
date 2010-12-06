JS_FUNCTION_MATCHER = /
  \/\/\sSTART\sJS\sMETHOD\s*
  js_method\(['"](\w+)['"]\)\s*
  =\s*
  (function\s*\([\w\s,]*\)\s*\{.+?\})\s*
  \/\/\sEND\sJS\sMETHOD
/xm

module ComponentExt
  def self.included component
    component.class_eval do
      class << self
        def js_method name
          js_method = @js_methods[name]
          js_method = js_method.gsub(/RUBY\[['"](\w+)['"]\]/) { |s| self.send($1) }
          super name, js_method
        end

        def parse_js_methods_file
          @js_methods = {}
          js_text = File.open("app/components/#{self.to_s.underscore}.js", 'r').read
          parse_js_methods js_text
        end

        def parse_js_methods js_text
          js_text = js_text.dup
          while js_text =~ JS_FUNCTION_MATCHER # FIXME: not robust - will break with nested functions. switch to better parsing strategy
            @js_methods[$1.to_sym] = $2
            js_text.sub!(JS_FUNCTION_MATCHER, '')
          end
        end
      end

      parse_js_methods_file
    end
  end
end