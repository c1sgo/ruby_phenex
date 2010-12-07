class BaseComponent < Netzke::Base
  parse_js_methods_file

  class << self
    def js_method name
      super name, @js_methods[name]
    end

    def parse_js_methods_file
      debugger
      @js_methods = "hello"
    end
  end
end