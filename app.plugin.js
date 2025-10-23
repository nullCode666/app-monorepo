const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withRenameApk(config) {
  const rawName = (config.name || config.slug || 'app').toString();
  const prefix = rawName.toLowerCase().replace(/[^0-9a-z._-]+/gi, '-');

  return withAppBuildGradle(config, (conf) => {
    conf.modResults.contents += `

// === rename APK: ${prefix}-{version}-{buildnumber}.apk ===
android.applicationVariants.all { variant ->
  variant.outputs.all { output ->
    if (output.outputFileName != null && output.outputFileName.endsWith(".apk")) {
      def vName = variant.versionName ?: "0.0.0"
      def vCode = variant.versionCode
      def safeV = vName.replaceAll(/[^0-9A-Za-z._-]/, "-")

      output.outputFileName = "${prefix}-" + safeV + "-" + vCode + ".apk"
    }
  }
}
`;
    return conf;
  });
};